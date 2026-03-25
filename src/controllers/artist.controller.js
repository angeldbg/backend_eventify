import Artist from '../models/Artist.js';
import Album from '../models/Album.js';
import Song from '../models/Song.js';

export const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getArtist = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ message: 'Artista no encontrado' });
        const albums = await Album.find({ artist: artist._id });
        const albumsWithSongs = await Promise.all(albums.map(async (album) => {
            const songs = await Song.find({ album: album._id });
            return { ...album.toObject(), songs };
        }));
        res.json({ ...artist.toObject(), albums: albumsWithSongs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createArtist = async (req, res) => {
    try {
        const artist = await Artist.create(req.body);
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};