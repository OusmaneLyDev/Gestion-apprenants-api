import express from 'express';
import studentRoute from './studentRoute.js'
const router = express.Router();



router.use(studentRoute);
export default router;