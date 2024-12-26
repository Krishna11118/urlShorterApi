import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignIn = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleId = payload['sub'];

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        googleId,
        email: payload['email'],
        name: payload['name'],
      });
      await user.save();
    }

    res.json({ message: 'Authentication successful', user });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
