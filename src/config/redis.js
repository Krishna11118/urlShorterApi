import Redis from 'ioredis';

let redisClient = null;

export const getRedisClient = async () => {
  if (!redisClient) {
    redisClient = new Redis(process.env.REDIS_URL);
    
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    
    await new Promise((resolve) => {
      redisClient.once('ready', resolve);
    });
    
    console.log('Connected to Redis');
  }
  
  return redisClient;
};
