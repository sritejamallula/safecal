import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';

const router = Router();

// GET /api/dashboard/stats
router.get('/stats', getDashboardStats);

export default router;
