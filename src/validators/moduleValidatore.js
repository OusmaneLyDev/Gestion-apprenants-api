import { body, param, validationResult } from "express-validator";


// Validation middleware for creating or updating a module
export const validateModule = [
  body("name")
    .notEmpty()
    .withMessage("Module name is required")
    .isString()
    .withMessage("Module name must be a string"),
  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isISO8601()
    .withMessage("Duration must be a valid ISO 8601 date"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
];

// Validation middleware for fetching or deleting a module by ID
export const validateModuleId = [
  param("id")
    .notEmpty()
    .withMessage("Module ID is required")
    .isInt()
    .withMessage("Module ID must be an integer"),
  validateRequest,
];

// Utility function to handle validation results
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
