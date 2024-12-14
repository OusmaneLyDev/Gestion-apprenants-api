import express from 'express';
import { listRegistrations, addRegistration, updateRegistration, deleteRegistration } from '../controllers/registrationController.js';
// import { validateregistration } from '../validators/registrationValidator.js';

const router = express.Router();

router.get('/registrations', listRegistrations);
router.post('/registration', addRegistration); 
router.put('/registration/:id', updateRegistration);
router.delete('/registration/:id', deleteRegistration);

export default router;
