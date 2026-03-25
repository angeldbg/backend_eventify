import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    coverImage: { type: String },
    releaseDate: { type: Date },
}, { timestamps: true });

export default mongoose.model('Album', albumSchema);