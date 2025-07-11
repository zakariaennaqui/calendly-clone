import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
    clientId: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    discountType: {type: String, enum: ['percentage', 'fixed'], required: true},
    discountValue: {type: Number, required: true},
    minAmount: {type: Number, default: 0},
    maxDiscount: {type: Number, default: null}, // for percentage discounts
    usageLimit: {type: Number, default: null}, // null for unlimited
    usageCount: {type: Number, default: 0},
    userUsageLimit: {type: Number, default: 1}, // per user limit
    validFrom: {type: Date, required: true},
    validUntil: {type: Date, required: true},
    applicableServices: [{type: String}], // service IDs, empty array means all services
    usedBy: [{
        userId: String,
        usedAt: {type: Date, default: Date.now},
        appointmentId: String
    }],
    isActive: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
});

const promoCodeModel = mongoose.models.promoCode || mongoose.model('promoCode', promoCodeSchema);

export default promoCodeModel;