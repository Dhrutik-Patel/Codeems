import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
} from '../controllers/userControllers.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route('/:id')
    .get(protect, isAdmin, getUserById)
    .delete(protect, isAdmin, deleteUser)
    .put(protect, isAdmin, updateUser);

export default router;
