import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Protect routes from unauthorized users
const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    // Check if the token exists
    if (!token) {
        res.status(401);
        throw new Error('Unauthorized, no token found');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by id and attach the user to the request object
        req.user = await User.findById({
            _id: decoded._id,
        }).select('-password');

        next();
    } catch (error) {
        res.status(401);
        throw new Error('Unauthorized, token failed');
    }
});

// Check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Unauthorized, not an admin');
    }
};

export { protect, isAdmin };
