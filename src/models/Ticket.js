import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    quantity: { type: Number, required: true, min: 1, max: 6 },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);