import { Router } from 'express';

const router = Router();

// GET /api/health
router.get('/', (req, res) => {
  return res.status(200).json({
    status: 'UP',
    service: 'Legal Metrology Backend Verification API',
    timestamp: new Date().toISOString()
  });
});

export default router;
