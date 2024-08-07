// src/controllers/testController.js

import { Router } from 'express';
const router = Router();
import { createTestDocument, getTestDocument } from '../controllers/testController.js';

router.post('/create', createTestDocument);
router.get('/get', getTestDocument);

export default router;
