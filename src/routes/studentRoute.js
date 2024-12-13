import express from 'express';
// import {
//   getCustomers,
//   createCustomer,
//   updateCustomer,
//   deleteCustomer,
// } from '../controllers/customerController.js';
import { getAllStudents, addStudent } from '../controllers/studentController.js';

const router = express.Router();

router.get('/students', getAllStudents);

router.post(
  '/student',
addStudent
);
export default router;
