import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    capacity: { type: Number, required: true },
    availableTickets: { type: Number, required: true },
    price: { type: Number, required: true },
    tour: { type: String },
    image: { type: String },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);