import { Router } from 'express';
import { buyTicket, getUserTickets, cancelTicket } from '../controllers/ticket.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();
router.post('/buy', authMiddleware, buyTicket);
router.get('/my-tickets', authMiddleware, getUserTickets);
router.patch('/cancel/:id', authMiddleware, cancelTicket);

export default router;