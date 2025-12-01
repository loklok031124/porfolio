import express from 'express';
import {
  signup,
  signin,
  signout,
  getCurrentUser
} from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// POST /api/auth/signup - Register new user
router.post('/signup', signup);

// POST /api/auth/signin - Login user
router.post('/signin', signin);

// POST /api/auth/signout - Logout user
router.post('/signout', signout);

// GET /api/auth/me - Get current logged in user
router.get('/me', requireAuth, getCurrentUser);

export default router;