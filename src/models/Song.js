import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    duration: { type: Number },
    youtubeUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Song', songSchema);