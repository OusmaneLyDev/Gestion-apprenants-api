import express from 'express';
import { getAllStudents, addStudent, updateStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();

router.get('/students', getAllStudents);
router.post('/student', addStudent); 
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

export default router;
