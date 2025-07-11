import nodemailer from 'nodemailer';

const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

export const sendEmail = async (to, subject, html) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `${process.env.EMAIL_FROM_NAME || 'Calendly Clone'} <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            html
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error: error.message };
    }
};

export const generateEmailTemplate = (type, data) => {
    const baseStyle = `
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #5f6fff; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { padding: 20px; text-align: center; color: #666; }
            .button { display: inline-block; padding: 12px 24px; background: #5f6fff; color: white; text-decoration: none; border-radius: 5px; }
        </style>
    `;

    switch (type) {
        case 'appointment_confirmation':
            return `
                ${baseStyle}
                <div class="container">
                    <div class="header">
                        <h1>Rendez-vous confirmé</h1>
                    </div>
                    <div class="content">
                        <h2>Bonjour ${data.userName},</h2>
                        <p>Votre rendez-vous a été confirmé avec succès.</p>
                        <p><strong>Service:</strong> ${data.serviceName}</p>
                        <p><strong>Date:</strong> ${data.date}</p>
                        <p><strong>Heure:</strong> ${data.time}</p>
                        <p><strong>Lieu:</strong> ${data.location}</p>
                        ${data.meetingLink ? `<p><strong>Lien de réunion:</strong> <a href="${data.meetingLink}">${data.meetingLink}</a></p>` : ''}
                    </div>
                    <div class="footer">
                        <p>Merci d'utiliser notre service de réservation.</p>
                    </div>
                </div>
            `;

        case 'appointment_reminder':
            return `
                ${baseStyle}
                <div class="container">
                    <div class="header">
                        <h1>Rappel de rendez-vous</h1>
                    </div>
                    <div class="content">
                        <h2>Bonjour ${data.userName},</h2>
                        <p>Nous vous rappelons votre rendez-vous prévu ${data.reminderTime}.</p>
                        <p><strong>Service:</strong> ${data.serviceName}</p>
                        <p><strong>Date:</strong> ${data.date}</p>
                        <p><strong>Heure:</strong> ${data.time}</p>
                        <p><strong>Lieu:</strong> ${data.location}</p>
                    </div>
                    <div class="footer">
                        <p>À bientôt !</p>
                    </div>
                </div>
            `;

        case 'event_confirmation':
            return `
                ${baseStyle}
                <div class="container">
                    <div class="header">
                        <h1>Inscription confirmée</h1>
                    </div>
                    <div class="content">
                        <h2>Bonjour ${data.userName},</h2>
                        <p>Votre inscription à l'événement a été confirmée.</p>
                        <p><strong>Événement:</strong> ${data.eventTitle}</p>
                        <p><strong>Date:</strong> ${data.startDate}</p>
                        <p><strong>Lieu:</strong> ${data.location}</p>
                        <p><strong>Description:</strong> ${data.description}</p>
                    </div>
                    <div class="footer">
                        <p>Nous avons hâte de vous voir !</p>
                    </div>
                </div>
            `;

        default:
            return `
                ${baseStyle}
                <div class="container">
                    <div class="content">
                        <p>${data.message}</p>
                    </div>
                </div>
            `;
    }
};