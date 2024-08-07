// src/routes/messageRoutes.js
import express from 'express';
import { addMessage, getMessages, getMessage, updateMessage, deleteMessage } from '../controllers/messageController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, addMessage);
router.get('/', authenticate, getMessages);
router.get('/:id', authenticate, getMessage);
router.put('/:id', authenticate, updateMessage);
router.delete('/:id', authenticate, deleteMessage);

export default router;
