import express from 'express';
import studentRoute from './studentRoute.js'
import moduleRoute from './moduleRoute.js'
import registrationRoute from './registrationRoute.js'
import paymentRoute from './paymentRoute.js'
const router = express.Router();



router.use(paymentRoute);
router.use(studentRoute);
router.use(moduleRoute);
router.use(registrationRoute);
export default router;