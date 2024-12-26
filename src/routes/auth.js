import express from 'express';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/google-signin', authenticate, (req, res) => {
    res.json({ 
      message: 'Authentication successful', 
      user: req.user 
    });
  });


export default router;