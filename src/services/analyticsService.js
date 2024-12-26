import Url from '../models/Url.js';
import redis from 'redis';
import shortid from 'shortid';
import geoip from 'geoip-lite';
import UAParser from 'ua-parser-js';

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

const createShortUrl = async (userId, longUrl, customAlias, topic) => {
  const shortUrl = customAlias || shortid.generate();

  const newUrl = new Url({
    userId,
    longUrl,
    shortUrl,
    customAlias,
    topic,
  });

  await newUrl.save();

  // Cache the short URL
  await redisClient.set(`shortUrl:${shortUrl}`, longUrl, 'EX', 86400); // Cache for 24 hours

  return {
    shortUrl: `${process.env.BASE_URL}/${shortUrl}`,
    createdAt: newUrl.createdAt,
  };
};

const getLongUrl = async (alias, userAgent, ipAddress) => {
  // Try to get the long URL from cache
  const cachedLongUrl = await redisClient.get(`shortUrl:${alias}`);

  if (cachedLongUrl) {
    // Update analytics asynchronously
    updateAnalytics(alias, userAgent, ipAddress);
    return cachedLongUrl;
  }

  const url = await Url.findOne({ shortUrl: alias });

  if (!url) {
    throw new Error('Short URL not found');
  }

  // Cache the short URL
  await redisClient.set(`shortUrl:${alias}`, url.longUrl, 'EX', 86400); // Cache for 24 hours

  // Update analytics
  await updateAnalytics(alias, userAgent, ipAddress);

  return url.longUrl;
};

const updateAnalytics = async (alias, userAgent, ipAddress) => {
  const url = await Url.findOne({ shortUrl: alias });

  if (!url) {
    return;
  }

  const parser = new UAParser(userAgent);
  const ua = parser.getResult();
  const geo = geoip.lookup(ipAddress);

  url.clicks.push({
    timestamp: new Date(),
    ipAddress,
    userAgent,
    os: ua.os.name,
    device: ua.device.type || 'desktop',
    geolocation: {
      country: geo ? geo.country : 'Unknown',
      city: geo ? geo.city : 'Unknown',
    },
  });

  await url.save();
};

export default {
  createShortUrl,
  getLongUrl,
};

