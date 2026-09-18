import { Router } from 'express';
import { getVerificationById, getVerificationByCertificate } from '../controllers/verification.controller.js';

const router = Router();

// GET /api/verification/:verificationId
router.get('/:verificationId', getVerificationById);

// GET /api/verification/certificate/:certificateNumber
router.get('/certificate/:certificateNumber', getVerificationByCertificate);

export default router;
