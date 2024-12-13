import express from "express";
import {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} from "../controllers/moduleControler.js";

const router = express.Router();

// Routes

// Get all modules
router.get("/", getModules);

// Get a single module by ID
router.get("/:id", getModuleById);

// Create a new module
router.post("/", createModule);

// Update a module by ID
router.put("/:id", updateModule);

// Delete a module by ID
router.delete("/:id", deleteModule);

export default router;
