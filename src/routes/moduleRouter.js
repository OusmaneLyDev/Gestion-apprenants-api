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
router.get("/", getModules);

// Get a single module by ID
router.get("/:id", validateModuleId, getModuleById);

// Create a new module
router.post("/", validateModule, createModule);

// Update a module by ID
router.put("/:id", [validateModuleId, validateModule], updateModule);

// Delete a module by ID
router.delete("/:id", validateModuleId, deleteModule);

export default router;
