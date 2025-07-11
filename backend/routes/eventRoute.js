import express from 'express';
import { getAllEvents, registerForEvent } from '../controllers/eventController.js';
import { validatePromoCode } from '../controllers/promoController.js';
import authUser from '../middlewares/authUser.js';

const eventRouter = express.Router();

// Public routes
eventRouter.get('/list', getAllEvents);

// User routes (require authentication)
eventRouter.post('/register', authUser, registerForEvent);
eventRouter.post('/validate-promo', authUser, validatePromoCode);

export default eventRouter;