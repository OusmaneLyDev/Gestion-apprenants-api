import { check, validationResult } from 'express-validator';

export const validateStudent = [
  // Validation pour fullName
  check('fullName')
    .isString()
    .withMessage('Le nom complet doit être une chaîne de caractères.')
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,50}$/)
    .withMessage('Le nom doit contenir uniquement des lettres, entre 3 et 50 caractères.'),

  // Validation pour phoneNumber
  check('phoneNumber')
    .isNumeric()
    .withMessage('Le numéro de téléphone doit contenir uniquement des chiffres.')
    .isLength({ min: 8, max: 15 })
    .withMessage('Le numéro de téléphone doit contenir entre 8 et 15 chiffres.'),

  // Validation pour email
  check('email')
    .isEmail()
    .withMessage('L\'email doit être valide.'),

  // Validation pour address
  check('address')
    .isString()
    .withMessage("L'adresse doit être une chaîne de caractères.")
    .isLength({ min: 5, max: 100 })
    .withMessage("L'adresse doit contenir entre 5 et 100 caractères."),

  // Validation pour tutor (facultatif, mais si présent)
  check('tutor')
    .optional()
    .isString()
    .withMessage('Le tuteur doit être une chaîne de caractères.'),

  // Validation pour status
  check('status')
    .isBoolean()
    .withMessage('Le statut doit être un booléen.'),

  // Middleware pour gérer les erreurs
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }
    next();
  },
];
