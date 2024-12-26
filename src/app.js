import express from 'express';
import mongoose from 'mongoose';
import redis from 'redis';
import { config } from 'dotenv';
import authRoutes from './routes/auth.js';
import urlRoutes from './routes/url.js';
import analyticsRoutes from './routes/analytics.js';
import { errorHandler } from './middleware/errorHandler.js';
import { createShortUrlLimiter } from './middleware/rateLimiter.js';

config();

const app = express();

// ---------------------Middleware
app.use(express.json());

// --------------------Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// -------------------Connect to Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect();

// -----------------------Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);
app.use('/api/analytics', analyticsRoutes);

const startServer = async () => {
  const shortUrlLimiter = await createShortUrlLimiter();
  app.use('/api/url/shorten', shortUrlLimiter);

  // ---------------------Error handling middleware
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;

