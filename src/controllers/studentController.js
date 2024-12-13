import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Fonction pour obtenir tous les étudiants
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.students.findMany({
      include: {
        user: true,
        registrations: true,
        payments: true,
      },
    });
    res.status(200).json(students);
  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des étudiants.' });
  }
};
export const addStudent = async (req, res) => {
  const { fullName, phoneNumber, email, address, tutor, status, userId } = req.body;

  try {
    // Validation des données
    if (!fullName || !phoneNumber || !email || !address || typeof status !== 'boolean' ) {
      return res.status(400).json({ error: 'Tous les champs requis doivent être remplis.' });
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
