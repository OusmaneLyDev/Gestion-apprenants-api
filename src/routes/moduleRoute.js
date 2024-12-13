import express from "express";
import {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} from "../controllers/moduleControler.js";
import {
  validateModule,
  validateModuleId,
} from "../validators/moduleValidatore.js";

const router = express.Router();

// Get all modules
router.get("/modules", getModules);

// Get a single module by ID
router.get("/modules/:id", getModuleById);

// Create a new module
router.post("/modules", validateModule, createModule);

// Update a module by ID
router.put("/modules/:id", [validateModuleId, validateModule], updateModule);

// Delete a module by ID
router.delete("/modules/:id", validateModuleId, deleteModule);

export default router;
