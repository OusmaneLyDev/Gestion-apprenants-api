import express from 'express';
import studentRoute from './studentRoute.js'
import moduleRoute from './moduleRoute.js'
import registrationRoute from './registrationRoute.js'
const router = express.Router();



router.use(studentRoute);
router.use(moduleRoute);
router.use(registrationRoute);
export default router;