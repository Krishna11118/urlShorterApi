import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getUrlAnalytics, getTopicAnalytics, getOverallAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/url/:alias', authenticate, getUrlAnalytics);
router.get('/topic/:topic', authenticate, getTopicAnalytics);
router.get('/overall', authenticate, getOverallAnalytics);

export default router;

