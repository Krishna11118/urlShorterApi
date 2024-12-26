import urlService from '../services/urlService.js';

export const createShortUrl = async (req, res) => {
  try {
    const { longUrl, customAlias, topic } = req.body;
    const userId = req.user._id;

    const shortUrl = await urlService.createShortUrl(userId, longUrl, customAlias, topic);
    res.status(201).json(shortUrl);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const redirectToLongUrl = async (req, res) => {
  try {
    const { alias } = req.params;
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;

    const longUrl = await urlService.getLongUrl(alias, userAgent, ipAddress);
    res.redirect(longUrl);
  } catch (error) {
    res.status(404).json({ error: 'Short URL not found' });
  }
};

