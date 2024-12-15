import prisma from "../config/prisma.js";

// Get all modules
export const getModules = async (req, res) => {
  try {
    const modules = await prisma.modules.findMany();
    res.status(200).json(modules);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve modules", details: error.message });
  }
};

// Get a single module by ID
export const getModuleById = async (req, res) => {
  const { id } = req.params;
  try {
    const module = await prisma.modules.findUnique({
      where: { id: parseInt(id) },
    });
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }
    res.status(200).json(module);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve the module", details: error.message });
  }
};

export const createModule = async (req, res) => {
  const { name, duration, price, status, userId } = req.body;

  // Ensure duration is a valid integer
  const durationInt = parseInt(duration, 10);

  if (isNaN(durationInt)) {
    return res.status(400).json({
      error: "Invalid format for 'duration'. It should be an integer.",
    });
  }

  try {
    const newModule = await prisma.modules.create({
      data: {
        name,
        duration: durationInt, // Use the integer value of duration
        price,
        status,
        userId,
      },
    });
    res.status(201).json(newModule);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create module", details: error.message });
  }
};

export const updateModule = async (req, res) => {
  const { id } = req.params;
  const { name, duration, price, status, userId } = req.body;

  try {
    const module = await prisma.modules.findUnique({
      where: { id: parseInt(id) },
    });
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    // Ensure duration is a valid integer if provided
    let durationInt;
    if (duration) {
      durationInt = parseInt(duration, 10);

      if (isNaN(durationInt)) {
        return res
          .status(400)
          .json({
            error: "Invalid format for 'duration'. It should be an integer.",
          });
      }
    }

    const updatedModule = await prisma.modules.update({
      where: { id: parseInt(id) },
      data: {
        name,
        duration: durationInt !== undefined ? durationInt : module.duration, // Use updated duration or keep the existing one if not provided
        price,
        status,
        userId,
      },
    });

    res.status(200).json(updatedModule);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update module", details: error.message });
  }
};

// Delete a module by ID
export const deleteModule = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.modules.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete module", details: error.message });
  }
};
