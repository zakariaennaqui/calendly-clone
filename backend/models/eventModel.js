import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    clientId: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true}, // physical address or "online"
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    maxParticipants: {type: Number, required: true},
    registrationDeadline: {type: Date, required: true},
    price: {type: Number, default: 0}, // 0 for free events
    currency: {type: String, default: "MAD"},
    isOnline: {type: Boolean, default: false},
    meetingLink: {type: String, default: ""},
    category: {type: String, default: "general"},
    tags: [{type: String}],
    registrations: [{
        userId: String,
        registeredAt: {type: Date, default: Date.now},
        paymentStatus: {type: String, enum: ['pending', 'paid', 'failed'], default: 'pending'},
        paymentMethod: {type: String, enum: ['online', 'onsite'], default: 'online'}
    }],
    isActive: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
});

const eventModel = mongoose.models.event || mongoose.model('event', eventSchema);

export default eventModel;