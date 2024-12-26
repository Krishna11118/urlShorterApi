import analyticsService from '../services/analyticsService.js';

export const getUrlAnalytics = async (req, res) => {
  try {
    const { alias } = req.params;
    const analytics = await analyticsService.getUrlAnalytics(alias);
    res.json(analytics);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getTopicAnalytics = async (req, res) => {
  try {
    const { topic } = req.params;
    const userId = req.user._id;
    const analytics = await analyticsService.getTopicAnalytics(userId, topic);
    res.json(analytics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getOverallAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const analytics = await analyticsService.getOverallAnalytics(userId);
    res.json(analytics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

