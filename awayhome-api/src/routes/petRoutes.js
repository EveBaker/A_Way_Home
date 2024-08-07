// src/routes/petRoutes.js
import { Router } from 'express';
import {
    addPet,
    getPets,
    getPet,
    updatePet,
    deletePet
} from '../controllers/petController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authenticate, addPet);
router.get('/', getPets);
router.get('/:id', getPet);
router.put('/:id', authenticate, updatePet);
router.delete('/:id', authenticate, deletePet);

export default router;
