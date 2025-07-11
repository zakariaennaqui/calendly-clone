import express from 'express';
import { registerClient, loginClient, getClientProfile, updateClientProfile, getClientDashboard } from '../controllers/clientController.js';
import { createEvent, getClientEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { createPromoCode, getClientPromoCodes, updatePromoCode, deletePromoCode } from '../controllers/promoController.js';
import authClient from '../middlewares/authClient.js';
import upload from '../middlewares/multer.js';

const clientRouter = express.Router();

// Authentication routes
clientRouter.post('/register', registerClient);
clientRouter.post('/login', loginClient);

// Profile routes
clientRouter.get('/profile', authClient, getClientProfile);
clientRouter.post('/update-profile', upload.single('image'), authClient, updateClientProfile);
clientRouter.get('/dashboard', authClient, getClientDashboard);

// Event management routes
clientRouter.post('/events', authClient, createEvent);
clientRouter.get('/events', authClient, getClientEvents);
clientRouter.put('/events/:eventId', authClient, updateEvent);
clientRouter.delete('/events/:eventId', authClient, deleteEvent);

// Promo code management routes
clientRouter.post('/promo-codes', authClient, createPromoCode);
clientRouter.get('/promo-codes', authClient, getClientPromoCodes);
clientRouter.put('/promo-codes/:promoId', authClient, updatePromoCode);
clientRouter.delete('/promo-codes/:promoId', authClient, deletePromoCode);

export default clientRouter;