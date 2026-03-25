import { Router } from 'express';
import { getArtists, getArtist, createArtist } from '../controllers/artist.controller.js';

const router = Router();
router.get('/', getArtists);
router.get('/:id', getArtist);
router.post('/', createArtist);

export default router;