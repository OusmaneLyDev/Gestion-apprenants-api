import express from 'express';
import { getAllStudents, addStudent, updateStudent, deleteStudent } from '../controllers/studentController.js';
import { validateStudent } from '../validators/studentValidator.js';

const router = express.Router();

router.get('/students', getAllStudents);
router.post('/student', validateStudent, addStudent); 
router.put('/student/:id', validateStudent, updateStudent);
router.delete('/student/:id', deleteStudent);

export default router;
