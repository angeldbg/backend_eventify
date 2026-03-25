import Event from '../models/Event.js';

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ date: { $gte: new Date() } })
            .populate('artist', 'name image genre')
            .sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEventsByArtist = async (req, res) => {
    try {
        const events = await Event.find({ artist: req.params.artistId, date: { $gte: new Date() } })
            .sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('artist', 'name image genre');
        if (!event) return res.status(404).json({ message: 'Evento no encontrado' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEvent = async (req, res) => {
    try {
        const event = await Event.create({ ...req.body, availableTickets: req.body.capacity });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};