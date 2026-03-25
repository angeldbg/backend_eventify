import { Router } from 'express';
import { getEvents, getEvent, getEventsByArtist, createEvent } from '../controllers/event.controller.js';

const router = Router();
router.get('/', getEvents);
router.get('/:id', getEvent);
router.get('/artist/:artistId', getEventsByArtist);
router.post('/', createEvent);

export default router;