import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createShortUrlLimiter } from '../middleware/rateLimiter.js';
import { createShortUrl, redirectToLongUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', authenticate, createShortUrlLimiter, createShortUrl);
router.get('/:alias', redirectToLongUrl);

export default router;

