import express from 'express';
import { getAllPayments, addPayment, updatePayment, deletePayment } from '../controllers/paymentController.js';

const router = express.Router();

// Route pour récupérer tous les paiements
router.get('/payments', getAllPayments);

// Route pour ajouter un paiement
router.post('/payments', addPayment);
router.put('/payments/:id', updatePayment);
router.delete('/payments/:paymentId', deletePayment);

export default router;
