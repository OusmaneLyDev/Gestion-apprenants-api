import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Vérifier si l'étudiant et le module existent
export const verifyStudentAndModuleExist = async (studentId, moduleId) => {
  const student = await prisma.students.findUnique({
    where: { id: studentId },
  });

  const module = await prisma.modules.findUnique({
    where: { id: moduleId },
  });

  if (!student) {
    throw new Error("Étudiant non trouvé");
  }
  if (!module) {
    throw new Error("Module non trouvé");
  }

  return { student, module };
};

// Ajouter une inscription
export const addRegistration = async (req, res) => {
  const { studentId, moduleId, amount, userId, startDate, endDate } = req.body;

  try {
    // Vérifier si l'étudiant et le module existent
    await verifyStudentAndModuleExist(studentId, moduleId);

    // Vérifier que startDate n'est pas après endDate
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: "La date de début ne peut pas être après la date de fin" });
    }

    // Utiliser la date actuelle si aucune dateRegister n'est fournie
    const dateRegister = req.body.dateRegister || new Date();

    // Créer l'enregistrement dans la base de données
    const registration = await prisma.registrations.create({
      data: {
        dateRegister,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        amount: parseFloat(amount), // S'assurer que amount est un nombre
        userId: userId || null, // userId est optionnel
        studentId,
        moduleId,
      },
    });

    return res.status(201).json(registration);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Lister les inscriptions
export const listRegistrations = async (req, res) => {
  try {
    const registrations = await prisma.registrations.findMany({
      include: {
        student: true,
        module: true,
        user: true,
        payments: true,
      },
    });

    return res.status(200).json(registrations);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération des inscriptions" });
  }
};

export const updateRegistration = async (req, res) => {
    const { id } = req.params; // ID de l'inscription à mettre à jour
    const { studentId, moduleId, amount, userId, startDate, endDate } = req.body;
  
    try {
      // Vérifier si l'inscription existe
      const existingRegistration = await prisma.registrations.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingRegistration) {
        return res.status(404).json({ message: "Inscription non trouvée" });
      }
  
      // Vérifier si l'étudiant et le module existent, si fournis
      if (studentId || moduleId) {
        await verifyStudentAndModuleExist(studentId || existingRegistration.studentId, moduleId || existingRegistration.moduleId);
      }
  
      // Vérifier que startDate n'est pas après endDate
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        return res.status(400).json({ message: "La date de début ne peut pas être après la date de fin" });
      }
  
      // Mettre à jour l'inscription
      const updatedRegistration = await prisma.registrations.update({
        where: { id: parseInt(id) },
        data: {
          studentId: studentId || existingRegistration.studentId,
          moduleId: moduleId || existingRegistration.moduleId,
          amount: amount !== undefined ? parseFloat(amount) : existingRegistration.amount,
          userId: userId !== undefined ? userId : existingRegistration.userId,
          startDate: startDate ? new Date(startDate) : existingRegistration.startDate,
          endDate: endDate ? new Date(endDate) : existingRegistration.endDate,
        },
      });
  
      return res.status(200).json(updatedRegistration);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  export const deleteRegistration = async (req, res) => {
    const { id } = req.params; // ID de l'inscription à supprimer
  
    try {
      // Vérifier si l'inscription existe
      const existingRegistration = await prisma.registrations.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingRegistration) {
        return res.status(404).json({ message: "Inscription non trouvée" });
      }
  
      // Supprimer l'inscription
      await prisma.registrations.delete({
        where: { id: parseInt(id) },
      });
  
      return res.status(200).json({ message: "Inscription supprimée avec succès" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  