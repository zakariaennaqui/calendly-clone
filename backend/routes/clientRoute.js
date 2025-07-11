import express from 'express';
import { registerClient, loginClient, getClientProfile, updateClientProfile, getClientDashboard } from '../controllers/clientController.js';
import { createEvent, getClientEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { createPromoCode, getClientPromoCodes, updatePromoCode, deletePromoCode } from '../controllers/promoController.js';
import { getClientAppointments } from '../controllers/serviceController.js';
import authClient from '../middlewares/authClient.js';
import upload from '../middlewares/multer.js';
import clientModel from '../models/clientModel.js';

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

// Public routes
clientRouter.get('/directory', async (req, res) => {
  try {
    const clients = await clientModel.find({ isActive: true }).select('-password');
    res.json({ success: true, clients });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

clientRouter.get('/public-profile/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await clientModel.findById(clientId).select('-password');
    if (!client) {
      return res.json({ success: false, message: 'Client non trouvé' });
    }
    res.json({ success: true, clientData: client });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Client appointments
clientRouter.get('/appointments', authClient, async (req, res) => {
  try {
    const clientId = req.clientId;
    const appointments = await appointmentModel.find({ docId: clientId }).sort({ date: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default clientRouter;