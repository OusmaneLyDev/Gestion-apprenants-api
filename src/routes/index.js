import express from 'express';
import studentRoute from './studentRoute.js'
import moduleRoute from './moduleRoute.js'
const router = express.Router();



router.use(studentRoute);
router.use(moduleRoute)
export default router;