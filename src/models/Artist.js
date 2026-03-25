import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    genre: { type: String },
    image: { type: String },
}, { timestamps: true });

export default mongoose.model('Artist', artistSchema);