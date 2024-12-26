import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authenticate = asyncHandler(async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Get user info using the access token
        const userInfoResponse = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        // console.log("userInfoResponse", userInfoResponse);

        if (!userInfoResponse.ok) {
            throw new Error('Failed to fetch user info');
        }

        const payload = await userInfoResponse.json();
        console.log("payload", payload);
        
        const googleId = payload.sub;

        // Check if user exists or create a new one
        let user = await User.findOne({ googleId });
        console.log("user", user);
        

        if (!user) {
            user = new User({
                googleId,
                email: payload.email,
                name: payload.name,
            });
            await user.save();
        }

        req.user = user;
        next();
    }  

    catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ 
            error: error.message || 'Invalid or expired token'
        });
    }
});