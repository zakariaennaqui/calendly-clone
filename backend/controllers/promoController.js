import promoCodeModel from '../models/promoCodeModel.js';
import { v4 as uuidv4 } from 'uuid';

// Create promo code
const createPromoCode = async (req, res) => {
    try {
        const clientId = req.clientId;
        const {
            code,
            description,
            discountType,
            discountValue,
            minAmount,
            maxDiscount,
            usageLimit,
            userUsageLimit,
            validFrom,
            validUntil,
            applicableServices
        } = req.body;

        if (!code || !description || !discountType || !discountValue || !validFrom || !validUntil) {
            return res.json({ success: false, message: "Tous les champs obligatoires doivent être remplis" });
        }

        const existingCode = await promoCodeModel.findOne({ code: code.toUpperCase() });
        if (existingCode) {
            return res.json({ success: false, message: "Ce code promo existe déjà" });
        }

        const promoData = {
            clientId,
            code: code.toUpperCase(),
            description,
            discountType,
            discountValue: Number(discountValue),
            minAmount: Number(minAmount) || 0,
            maxDiscount: maxDiscount ? Number(maxDiscount) : null,
            usageLimit: usageLimit ? Number(usageLimit) : null,
            userUsageLimit: Number(userUsageLimit) || 1,
            validFrom: new Date(validFrom),
            validUntil: new Date(validUntil),
            applicableServices: applicableServices ? JSON.parse(applicableServices) : []
        };

        const newPromoCode = new promoCodeModel(promoData);
        await newPromoCode.save();

        res.json({ success: true, message: "Code promo créé avec succès" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get client promo codes
const getClientPromoCodes = async (req, res) => {
    try {
        const clientId = req.clientId;
        const promoCodes = await promoCodeModel.find({ clientId }).sort({ createdAt: -1 });
        res.json({ success: true, promoCodes });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Validate promo code
const validatePromoCode = async (req, res) => {
    try {
        const { code, amount, serviceId } = req.body;
        const userId = req.userId;

        const promoCode = await promoCodeModel.findOne({ 
            code: code.toUpperCase(),
            isActive: true,
            validFrom: { $lte: new Date() },
            validUntil: { $gte: new Date() }
        });

        if (!promoCode) {
            return res.json({ success: false, message: "Code promo invalide ou expiré" });
        }

        // Check minimum amount
        if (amount < promoCode.minAmount) {
            return res.json({ 
                success: false, 
                message: `Montant minimum requis: ${promoCode.minAmount} MAD` 
            });
        }

        // Check usage limits
        if (promoCode.usageLimit && promoCode.usageCount >= promoCode.usageLimit) {
            return res.json({ success: false, message: "Code promo épuisé" });
        }

        // Check user usage limit
        const userUsage = promoCode.usedBy.filter(usage => usage.userId === userId).length;
        if (userUsage >= promoCode.userUsageLimit) {
            return res.json({ success: false, message: "Vous avez déjà utilisé ce code promo" });
        }

        // Check applicable services
        if (promoCode.applicableServices.length > 0 && !promoCode.applicableServices.includes(serviceId)) {
            return res.json({ success: false, message: "Ce code promo n'est pas applicable à ce service" });
        }

        // Calculate discount
        let discount = 0;
        if (promoCode.discountType === 'percentage') {
            discount = (amount * promoCode.discountValue) / 100;
            if (promoCode.maxDiscount && discount > promoCode.maxDiscount) {
                discount = promoCode.maxDiscount;
            }
        } else {
            discount = promoCode.discountValue;
        }

        const finalAmount = Math.max(0, amount - discount);

        res.json({ 
            success: true, 
            discount,
            finalAmount,
            promoCodeId: promoCode._id,
            message: `Réduction de ${discount} MAD appliquée`
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Apply promo code (when appointment is booked)
const applyPromoCode = async (promoCodeId, userId, appointmentId) => {
    try {
        const promoCode = await promoCodeModel.findById(promoCodeId);
        if (promoCode) {
            promoCode.usageCount += 1;
            promoCode.usedBy.push({
                userId,
                appointmentId,
                usedAt: new Date()
            });
            await promoCode.save();
        }
    } catch (error) {
        console.log('Error applying promo code:', error);
    }
};

// Update promo code
const updatePromoCode = async (req, res) => {
    try {
        const clientId = req.clientId;
        const { promoId } = req.params;
        const updateData = req.body;

        const promoCode = await promoCodeModel.findOne({ _id: promoId, clientId });
        if (!promoCode) {
            return res.json({ success: false, message: "Code promo non trouvé" });
        }

        await promoCodeModel.findByIdAndUpdate(promoId, updateData);
        res.json({ success: true, message: "Code promo mis à jour" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete promo code
const deletePromoCode = async (req, res) => {
    try {
        const clientId = req.clientId;
        const { promoId } = req.params;

        const promoCode = await promoCodeModel.findOne({ _id: promoId, clientId });
        if (!promoCode) {
            return res.json({ success: false, message: "Code promo non trouvé" });
        }

        await promoCodeModel.findByIdAndDelete(promoId);
        res.json({ success: true, message: "Code promo supprimé" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { createPromoCode, getClientPromoCodes, validatePromoCode, applyPromoCode, updatePromoCode, deletePromoCode };