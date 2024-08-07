import express from 'express';
import { addFlyer, getFlyers, getFlyer, updateFlyer, deleteFlyer } from '../controllers/flyerController.js';

const router = express.Router();

router.post('/', addFlyer);
router.get('/', getFlyers);
router.get('/:id', getFlyer);
router.put('/:id', updateFlyer);
router.delete('/:id', deleteFlyer);

export default router;
