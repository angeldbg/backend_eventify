import Ticket from '../models/Ticket.js';
import Event from '../models/Event.js';

const MAX_TICKETS_PER_USER = 6;

export const buyTicket = async (req, res) => {
    try {
        const { eventId, quantity } = req.body;
        const userId = req.user.id;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Evento no encontrado' });

        // Aqui compruebo cuantas entradas habia comprado ya este usuario para este evento.
        const existingTicket = await Ticket.findOne({ user: userId, event: eventId, status: 'active' });
        const alreadyBought = existingTicket ? existingTicket.quantity : 0;

        if (alreadyBought + quantity > MAX_TICKETS_PER_USER) {
            return res.status(400).json({ 
                message: `No puedes comprar más de ${MAX_TICKETS_PER_USER} tickets por evento. Ya tienes ${alreadyBought}.` 
            });
        }

        if (event.availableTickets < quantity) {
            return res.status(400).json({ message: 'No hay suficientes tickets disponibles' });
        }

        // Resto las entradas disponibles del evento despues de la compra.
        event.availableTickets -= quantity;
        await event.save();

        const totalPrice = event.price * quantity;

        if (existingTicket) {
            existingTicket.quantity += quantity;
            existingTicket.totalPrice += totalPrice;
            await existingTicket.save();
            return res.json(existingTicket);
        }

        const ticket = await Ticket.create({ user: userId, event: eventId, quantity, totalPrice });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user.id })
            .populate({ path: 'event', populate: { path: 'artist', select: 'name image' } });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user.id });
        if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });
        
        // Si se cancela, devuelvo esas entradas al aforo disponible.
        await Event.findByIdAndUpdate(ticket.event, { $inc: { availableTickets: ticket.quantity } });
        
        ticket.status = 'cancelled';
        await ticket.save();
        res.json({ message: 'Ticket cancelado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
