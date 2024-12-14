import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction pour obtenir tous les paiements
export const getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payments.findMany({
      include: {
        student: true,
        module: true,
        registration: true,
        user: true,
      },
    });
    res.status(200).json(payments);
  } catch (error) {
    console.error('Erreur lors de la récupération des paiements :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des paiements.' });
  }
};

// Fonction pour ajouter un paiement
export const addPayment = async (req, res) => {
    const {
      studentId,
      moduleId,
      registrationId,
      userId,
      paymentDate,
      amount,
      payer,
      payerNumber,
      paymentMode,
    } = req.body;
  
    try {
      // Vérification des champs requis
      if (!studentId || !moduleId || !registrationId || !paymentDate || !amount || !payer || !payerNumber || !paymentMode) {
        return res.status(400).json({ error: 'Tous les champs requis doivent être remplis.' });
      }
  
      // Récupérer le coût du module
      const module = await prisma.modules.findUnique({
        where: { id: moduleId },
      });
  
      if (!module) {
        return res.status(404).json({ error: 'Module introuvable.' });
      }
  
      const modulePrice = parseFloat(module.price); // Convertir le prix du module en nombre
      if (isNaN(modulePrice)) {
        return res.status(500).json({ error: 'Le prix du module est invalide.' });
      }
  
      // Calculer le montant total payé pour ce module
      const totalPaid = await prisma.payments.aggregate({
        where: { moduleId },
        _sum: {
          amount: true,
        },
      });
  
      const totalPaidAmount = parseFloat(totalPaid._sum.amount || 0); // Convertir en nombre
      const paymentAmount = parseFloat(amount); // Convertir le montant payé en nombre
  
      if (isNaN(paymentAmount)) {
        return res.status(400).json({ error: 'Le montant du paiement est invalide.' });
      }
  
      // Vérifier si le montant cumulé dépasse le prix du module
      if (totalPaidAmount >= modulePrice) {
        return res.status(400).json({
          error: 'Le module est déjà totalement payé.',
          totalPaid: totalPaidAmount,
          modulePrice,
        });
      }
  
      // Vérifier si le montant actuel dépasse le montant restant
      const remainingAmount = modulePrice - totalPaidAmount;
      if (paymentAmount > remainingAmount) {
        return res.status(400).json({
          error: 'Le montant du paiement dépasse le montant restant à payer.',
          remainingAmount,
          totalPaid: totalPaidAmount,
          modulePrice,
        });
      }
  
      // Créer le nouveau paiement
      const newPayment = await prisma.payments.create({
        data: {
          studentId,
          moduleId,
          registrationId,
          userId,
          paymentDate: new Date(paymentDate),
          amount: paymentAmount.toFixed(2), // Stocker comme chaîne formatée
          payer,
          payerNumber,
          paymentMode,
        },
      });
  
      return res.status(201).json({
        message: 'Le paiement a été ajouté avec succès!',
        payment: newPayment,
        totalPaid: totalPaidAmount + paymentAmount,
        remainingAmount: remainingAmount - paymentAmount,
        modulePrice,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un paiement :", error);
      return res.status(500).json({ error: "Une erreur est survenue lors de l'ajout d'un paiement." });
    }
  };
  
  
 // Mettre à jour un paiement
export const updatePayment = async (req, res) => {
    const { id } = req.params;
    const {
      studentId,
      moduleId,
      registrationId,
      userId,
      paymentDate,
      amount,
      payer,
      payerNumber,
      paymentMode,
    } = req.body;
  
    try {
      const payment = await prisma.payments.findUnique({ where: { id: parseInt(id) } });
      if (!payment) return res.status(404).json({ error: 'Paiement non trouvé.' });
  
      const updatedPayment = await prisma.payments.update({
        where: { id: parseInt(id) },
        data: {
          studentId,
          moduleId,
          registrationId,
          userId,
          paymentDate: new Date(paymentDate),
          amount,
          payer,
          payerNumber,
          paymentMode,
        },
      });
  
      res.status(200).json({ message: 'Paiement mis à jour avec succès!', payment: updatedPayment });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du paiement :', error);
      res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
  };
  
  // Fonction pour supprimer un paiement
  export const deletePayment = async (req, res) => {
    const { id } = req.params; // ID du paiement à supprimer
  
    try {
      // Validation de l'ID
      if (!id) {
        return res.status(400).json({ error: "L'ID du paiement est requis." });
      }
  
      // Suppression du paiement
      await prisma.payments.delete({
        where: { id: parseInt(id) }, // Conversion en entier
      });
  
      res.status(200).json({ message: 'Le paiement a été supprimé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression du paiement :', error);
  
      // Gestion de l'erreur Prisma pour un ID introuvable
      if (error.code === 'P2025') {
        return res.status(404).json({ error: "Le paiement spécifié n'existe pas." });
      }
  
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du paiement.' });
    }
  };
  
  