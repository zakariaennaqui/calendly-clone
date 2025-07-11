import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    type: {type: String, enum: ['appointment_confirmation', 'appointment_reminder', 'appointment_cancellation', 'event_confirmation', 'event_reminder'], required: true},
    recipientId: {type: String, required: true},
    recipientEmail: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
    appointmentId: {type: String},
    eventId: {type: String},
    scheduledFor: {type: Date, required: true},
    sentAt: {type: Date},
    status: {type: String, enum: ['pending', 'sent', 'failed'], default: 'pending'},
    attempts: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

const notificationModel = mongoose.models.notification || mongoose.model('notification', notificationSchema);

export default notificationModel;