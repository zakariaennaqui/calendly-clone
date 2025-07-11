import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import clientModel from '../models/clientModel.js';
import appointmentModel from '../models/appointmentModel.js';
import eventModel from '../models/eventModel.js';
import promoCodeModel from '../models/promoCodeModel.js';
import { v2 as cloudinary } from 'cloudinary';

// Client registration
const registerClient = async (req, res) => {
    try {
        const { name, email, password, phone, bio, website } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Tous les champs obligatoires doivent être remplis" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Veuillez entrer un email valide" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Le mot de passe doit contenir au moins 8 caractères" });
        }

        const existingClient = await clientModel.findOne({ email });
        if (existingClient) {
            return res.json({ success: false, message: "Un compte avec cet email existe déjà" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const clientData = {
            name,
            email,
            password: hashedPassword,
            phone: phone || "",
            bio: bio || "",
            website: website || ""
        };

        const newClient = new clientModel(clientData);
        const client = await newClient.save();

        const token = jwt.sign({ id: client._id, type: 'client' }, process.env.JWT_SECRET);

        res.json({ success: true, token, message: "Compte client créé avec succès" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Client login
const loginClient = async (req, res) => {
    try {
        const { email, password } = req.body;

        const client = await clientModel.findOne({ email });
        if (!client) {
            return res.json({ success: false, message: "Email ou mot de passe incorrect" });
        }

        const isMatch = await bcrypt.compare(password, client.password);
        if (isMatch) {
            const token = jwt.sign({ id: client._id, type: 'client' }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Email ou mot de passe incorrect" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get client profile
const getClientProfile = async (req, res) => {
    try {
        const clientId = req.clientId;
        const clientData = await clientModel.findById(clientId).select('-password');
        res.json({ success: true, clientData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update client profile
const updateClientProfile = async (req, res) => {
    try {
        const clientId = req.clientId;
        const { name, phone, bio, website, timezone, workingHours, slotDuration, bufferTime, maxAdvanceBooking, minAdvanceBooking } = req.body;
        const imageFile = req.file;

        const updateData = {
            name,
            phone,
            bio,
            website,
            timezone,
            slotDuration: Number(slotDuration),
            bufferTime: Number(bufferTime),
            maxAdvanceBooking: Number(maxAdvanceBooking),
            minAdvanceBooking: Number(minAdvanceBooking)
        };

        if (workingHours) {
            updateData.workingHours = JSON.parse(workingHours);
        }

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url;
        }

        await clientModel.findByIdAndUpdate(clientId, updateData);
        res.json({ success: true, message: "Profil mis à jour avec succès" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get client dashboard data
const getClientDashboard = async (req, res) => {
    try {
        const clientId = req.clientId;

        const appointments = await appointmentModel.find({ clientId });
        const events = await eventModel.find({ clientId });
        const promoCodes = await promoCodeModel.find({ clientId });

        const totalRevenue = appointments
            .filter(apt => apt.payment && apt.isCompleted)
            .reduce((sum, apt) => sum + apt.amount, 0);

        const upcomingAppointments = appointments.filter(apt => 
            new Date(apt.slotDate.replace(/_/g, '/')) > new Date() && !apt.cancelled
        );

        const dashData = {
            totalAppointments: appointments.length,
            upcomingAppointments: upcomingAppointments.length,
            totalEvents: events.length,
            totalRevenue,
            activePromoCodes: promoCodes.filter(code => code.isActive).length,
            recentAppointments: appointments.slice(-5).reverse()
        };

        res.json({ success: true, dashData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { registerClient, loginClient, getClientProfile, updateClientProfile, getClientDashboard };