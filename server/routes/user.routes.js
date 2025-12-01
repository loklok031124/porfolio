/**
 * File: user.routes.js
 * Student Name: [Your Name]
 * Student ID: [Your ID]
 * Date: [Date]
 * Description: Routes for User API endpoints
 */

import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers
} from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes - require authentication
router.get('/', requireAuth, getAllUsers);
router.get('/:id', requireAuth, getUserById);
router.post('/', createUser);
router.put('/:id', requireAuth, updateUser);
router.delete('/:id', requireAuth, deleteUser);
router.delete('/', requireAuth, deleteAllUsers);

export default router;