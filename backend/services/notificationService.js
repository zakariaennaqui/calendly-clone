import cron from 'node-cron';
import notificationModel from '../models/notificationModel.js';
import appointmentModel from '../models/appointmentModel.js';
import eventModel from '../models/eventModel.js';
import userModel from '../models/userModel.js';
import { sendEmail, generateEmailTemplate } from '../config/email.js';

// Schedule appointment reminders
const scheduleAppointmentReminders = async (appointmentId) => {
    try {
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) return;

        const user = await userModel.findById(appointment.userId);
        if (!user) return;

        const appointmentDate = new Date(appointment.slotDate.replace(/_/g, '/'));
        const appointmentTime = appointment.slotTime;
        
        // Parse time and create full datetime
        const [hours, minutes] = appointmentTime.split(':');
        appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        // Schedule reminder 24 hours before
        const reminder24h = new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000);
        if (reminder24h > new Date()) {
            await notificationModel.create({
                type: 'appointment_reminder',
                recipientId: user._id,
                recipientEmail: user.email,
                subject: 'Rappel de rendez-vous - Demain',
                message: `Rappel: Vous avez un rendez-vous demain à ${appointmentTime}`,
                appointmentId,
                scheduledFor: reminder24h
            });
        }

        // Schedule reminder 1 hour before
        const reminder1h = new Date(appointmentDate.getTime() - 60 * 60 * 1000);
        if (reminder1h > new Date()) {
            await notificationModel.create({
                type: 'appointment_reminder',
                recipientId: user._id,
                recipientEmail: user.email,
                subject: 'Rappel de rendez-vous - Dans 1 heure',
                message: `Rappel: Vous avez un rendez-vous dans 1 heure à ${appointmentTime}`,
                appointmentId,
                scheduledFor: reminder1h
            });
        }

    } catch (error) {
        console.log('Error scheduling appointment reminders:', error);
    }
};

// Schedule event reminders
const scheduleEventReminders = async (eventId, userId) => {
    try {
        const event = await eventModel.findById(eventId);
        const user = await userModel.findById(userId);
        
        if (!event || !user) return;

        // Schedule reminder 24 hours before event
        const reminder24h = new Date(event.startDate.getTime() - 24 * 60 * 60 * 1000);
        if (reminder24h > new Date()) {
            await notificationModel.create({
                type: 'event_reminder',
                recipientId: user._id,
                recipientEmail: user.email,
                subject: `Rappel: ${event.title} - Demain`,
                message: `Rappel: L'événement "${event.title}" aura lieu demain`,
                eventId,
                scheduledFor: reminder24h
            });
        }

    } catch (error) {
        console.log('Error scheduling event reminders:', error);
    }
};

// Process pending notifications
const processPendingNotifications = async () => {
    try {
        const pendingNotifications = await notificationModel.find({
            status: 'pending',
            scheduledFor: { $lte: new Date() }
        });

        for (const notification of pendingNotifications) {
            try {
                let emailData = {};
                
                if (notification.appointmentId) {
                    const appointment = await appointmentModel.findById(notification.appointmentId);
                    if (appointment) {
                        emailData = {
                            userName: appointment.userData.name,
                            serviceName: appointment.docData.name,
                            date: appointment.slotDate.replace(/_/g, '/'),
                            time: appointment.slotTime,
                            location: `${appointment.docData.address.line1}, ${appointment.docData.address.line2}`,
                            reminderTime: notification.type.includes('reminder') ? 
                                (notification.subject.includes('Demain') ? 'demain' : 'dans 1 heure') : ''
                        };
                    }
                }

                const emailHtml = generateEmailTemplate(notification.type, emailData);
                const result = await sendEmail(notification.recipientEmail, notification.subject, emailHtml);

                if (result.success) {
                    notification.status = 'sent';
                    notification.sentAt = new Date();
                } else {
                    notification.status = 'failed';
                    notification.attempts += 1;
                }

                await notification.save();

            } catch (error) {
                console.log(`Error sending notification ${notification._id}:`, error);
                notification.status = 'failed';
                notification.attempts += 1;
                await notification.save();
            }
        }

    } catch (error) {
        console.log('Error processing notifications:', error);
    }
};

// Run notification processor every minute
cron.schedule('* * * * *', processPendingNotifications);

export { scheduleAppointmentReminders, scheduleEventReminders, processPendingNotifications };