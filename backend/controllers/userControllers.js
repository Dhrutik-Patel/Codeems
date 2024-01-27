import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateJwtToken from '../utilities/generateJwtToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Check if password is matched with the hashed password in the database
    const isPasswordMatch = await user.isPasswordMatch(password);
    if (!isPasswordMatch) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // If the user is found and password is matched, create a token for the user
    generateJwtToken(res, user._id);

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
        res.status(400); // Bad request
        throw new Error('User already exists');
    }

    // Create a new user
    const user = await User.create({ name, email, password });

    if (user) {
        // If the user is created, create a token for the user
        generateJwtToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user & clear cookie
// @route   GET /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');

    res.json({ message: 'Logged out' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById({ _id: req.user._id });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById({ _id: req.user._id });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Update the user profile
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // If the password is provided, update the password
    if (req.body.password) {
        user.password = req.body.password;
    }

    // Save the updated user
    const updatedUser = await user.save();

    // If the user is updated, create a token for the user
    // generateJwtToken(res, updatedUser._id);

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('Success');
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('Success');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('Success');
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('Success');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
};
