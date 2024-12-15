// Importations nécessaires
import { PrismaClient }  from '@prisma/client';
const prisma = new PrismaClient();

// Fonction pour obtenir tous les étudiants
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.students.findMany({
      include: {
        user: true,
        registration: true,
        payment: true,
      },
    });
    res.status(200).json(students);
  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des étudiants.' });
  }
};
// Fonction pour ajouter un nouvel étudiant
export const addStudent = async (req, res) => {
    const { fullName, phoneNumber, email, address, tutor, status, userId } = req.body;
  
    try {
      // Validation des données
      if (!fullName || !phoneNumber || !email || !address || typeof status !== 'boolean') {
        return res.status(400).json({ error: 'Tous les champs requis doivent être remplis.' });
      }
      const existingStudent = await prisma.students.findFirst({
        where: {
          OR: [
            { phoneNumber },
            { email },
          ],
        },
      });
  
      if (existingStudent) {
        return res.status(400).json({ error: 'Ce étudiant existe déjà.' });
      }
      // Création d'un nouvel étudiant
      const newStudent = await prisma.students.create({
        data: {
          fullName,
          phoneNumber,
          email,
          address,
          tutor,
          status,
          userId,
        },
      });
  
      res.status(201).json(newStudent);
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'un étudiant :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout d\'un étudiant.' });
    }
  };  

// Fonction pour mettre à jour un étudiant
export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { fullName, phoneNumber, email, address, tutor, status, userId } = req.body;
  
    try {
      // Validation des données
      if (!id || (!fullName && !phoneNumber && !email && !address && !tutor && typeof status !== 'boolean' && !userId)) {
        return res.status(400).json({ error: 'L\'ID et au moins un champ à mettre à jour doivent être fournis.' });
      }
  
      // Vérification des doublons pour le numéro de téléphone et l'email
      const updateData = { fullName, address, tutor, status, userId };
  
      if (phoneNumber) {
        const existingPhoneNumber = await prisma.students.findUnique({
          where: { phoneNumber },
        });
        if (existingPhoneNumber && existingPhoneNumber.id !== parseInt(id)) {
          return res.status(400).json({ error: 'Le numéro de téléphone est déjà utilisé.' });
        }
        updateData.phoneNumber = phoneNumber;
      }
  
      if (email) {
        const existingEmail = await prisma.students.findUnique({
          where: { email },
        });
        if (existingEmail && existingEmail.id !== parseInt(id)) {
          return res.status(400).json({ error: 'L\'email est déjà utilisé.' });
        }
        updateData.email = email;
      }
  
      // Mise à jour de l'étudiant
      const updatedStudent = await prisma.students.update({
        where: { id: parseInt(id) },
        data: updateData,
      });
  
      res.status(200).json(updatedStudent);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'étudiant :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'étudiant.' });
    }
  };
  
  // Fonction pour supprimer un étudiant
  export const deleteStudent = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Validation de l'ID
      if (!id) {
        return res.status(400).json({ error: 'L\'ID de l\'étudiant est requis.' });
      }
  
      // Suppression de l'étudiant
      await prisma.students.delete({
        where: { id: parseInt(id) },
      });
  
      res.status(200).json({ message: 'Supprimé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'étudiant :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'étudiant.' });
    }
  };  
