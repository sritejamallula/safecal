import { Router } from 'express';
import { getInstruments, createInstrument, approveVerification, rejectVerification } from '../controllers/instruments.controller.js';

const router = Router();

// GET /api/instruments
router.get('/', getInstruments);

// POST /api/instruments
router.post('/', createInstrument);

// POST /api/verification/:id/approve
router.post('/:id/approve', approveVerification);

// POST /api/verification/:id/reject
router.post('/:id/reject', rejectVerification);

export default router;
