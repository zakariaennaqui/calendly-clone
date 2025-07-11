import eventModel from '../models/eventModel.js';
import userModel from '../models/userModel.js';
import { sendEmail, generateEmailTemplate } from '../config/email.js';

// Create event
const createEvent = async (req, res) => {
    try {
        const clientId = req.clientId;
        const {
            title,
            description,
            location,
            startDate,
            endDate,
            maxParticipants,
            registrationDeadline,
            price,
            isOnline,
            meetingLink,
            category,
            tags
        } = req.body;

        if (!title || !description || !location || !startDate || !endDate || !maxParticipants || !registrationDeadline) {
            return res.json({ success: false, message: "Tous les champs obligatoires doivent être remplis" });
        }

        const eventData = {
            clientId,
            title,
            description,
            location,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            maxParticipants: Number(maxParticipants),
            registrationDeadline: new Date(registrationDeadline),
            price: Number(price) || 0,
            isOnline: isOnline === 'true',
            meetingLink: meetingLink || '',
            category: category || 'general',
            tags: tags ? JSON.parse(tags) : []
        };

        const newEvent = new eventModel(eventData);
        await newEvent.save();

        res.json({ success: true, message: "Événement créé avec succès" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get client events
const getClientEvents = async (req, res) => {
    try {
        const clientId = req.clientId;
        const events = await eventModel.find({ clientId }).sort({ createdAt: -1 });
        res.json({ success: true, events });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get all active events (for users)
const getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.find({ 
            isActive: true,
            registrationDeadline: { $gt: new Date() }
        }).sort({ startDate: 1 });

        res.json({ success: true, events });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Register for event
const registerForEvent = async (req, res) => {
    try {
        const userId = req.userId;
        const { eventId, paymentMethod } = req.body;

        const event = await eventModel.findById(eventId);
        if (!event) {
            return res.json({ success: false, message: "Événement non trouvé" });
        }

        if (new Date() > event.registrationDeadline) {
            return res.json({ success: false, message: "La période d'inscription est terminée" });
        }

        if (event.registrations.length >= event.maxParticipants) {
            return res.json({ success: false, message: "Événement complet" });
        }

        const alreadyRegistered = event.registrations.find(reg => reg.userId === userId);
        if (alreadyRegistered) {
            return res.json({ success: false, message: "Vous êtes déjà inscrit à cet événement" });
        }

        const registration = {
            userId,
            paymentMethod: paymentMethod || 'online',
            paymentStatus: event.price === 0 ? 'paid' : 'pending'
        };

        event.registrations.push(registration);
        await event.save();

        // Send confirmation email
        const userData = await userModel.findById(userId);
        if (userData) {
            const emailData = {
                userName: userData.name,
                eventTitle: event.title,
                startDate: event.startDate.toLocaleDateString('fr-FR'),
                location: event.location,
                description: event.description
            };

            const emailHtml = generateEmailTemplate('event_confirmation', emailData);
            await sendEmail(userData.email, 'Inscription confirmée', emailHtml);
        }

        res.json({ success: true, message: "Inscription réussie" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update event
const updateEvent = async (req, res) => {
    try {
        const clientId = req.clientId;
        const { eventId } = req.params;
        const updateData = req.body;

        const event = await eventModel.findOne({ _id: eventId, clientId });
        if (!event) {
            return res.json({ success: false, message: "Événement non trouvé" });
        }

        await eventModel.findByIdAndUpdate(eventId, updateData);
        res.json({ success: true, message: "Événement mis à jour" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete event
const deleteEvent = async (req, res) => {
    try {
        const clientId = req.clientId;
        const { eventId } = req.params;

        const event = await eventModel.findOne({ _id: eventId, clientId });
        if (!event) {
            return res.json({ success: false, message: "Événement non trouvé" });
        }

        await eventModel.findByIdAndDelete(eventId);
        res.json({ success: true, message: "Événement supprimé" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { createEvent, getClientEvents, getAllEvents, registerForEvent, updateEvent, deleteEvent };