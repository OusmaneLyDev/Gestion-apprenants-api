import prisma  from '../config/prisma.js';


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
    if (!studentId || !moduleId || !registrationId || !paymentDate || !amount || !payer || !payerNumber || !paymentMode) {
      return res.status(400).json({ error: 'Tous les champs requis doivent être remplis.' });
    }

    const newPayment = await prisma.payments.create({
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

    return res.status(201).json({
        message: 'Le paiement a été ajouté avec succès!',
        payment: newPayment,  
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'un paiement :', error);
      return res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout d\'un paiement.' });
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
    const { paymentId } = req.params;  // ID du paiement à supprimer
  
    try {
      await prisma.payments.delete({
        where: { id: Number(paymentId) }, // Recherche du paiement par ID
      });
  
      return res.status(200).json({
        message: 'Le paiement a été supprimé avec succès!',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du paiement :', error);
      return res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du paiement.' });
    }
  };
