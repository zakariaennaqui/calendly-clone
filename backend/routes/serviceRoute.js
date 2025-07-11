import express from 'express';
import { serviceList, loginService, appointmentsService, appointmentComplete, appointmentCancel, serviceDashboard, serviceProfile, updateServiceProfile } from '../controllers/serviceController.js';
import authService from '../middlewares/authService.js';

const serviceRouter = express.Router();

serviceRouter.get('/list' , serviceList)
serviceRouter.post('/login' , loginService)
serviceRouter.get('/appointments', authService, appointmentsService)
serviceRouter.post('/complete-appointment', authService, appointmentComplete)
serviceRouter.post('/cancel-appointment', authService, appointmentCancel)
serviceRouter.get('/dashboard', authService, serviceDashboard)
serviceRouter.get('/profile', authService, serviceProfile)
serviceRouter.post('/update-profile', authService, updateServiceProfile)

export default serviceRouter;