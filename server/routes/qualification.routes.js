/**
 * File: qualification.routes.js
 * Student Name: [Your Name]
 * Student ID: [Your ID]
 * Date: [Date]
 * Description: Routes for Qualification API endpoints
 */

import express from 'express';
import {
  getAllQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} from '../controllers/qualification.controller.js';

const router = express.Router();

// GET /api/qualifications - Get all qualifications
router.get('/', getAllQualifications);
// GET /api/qualifications/:id - Get qualification by ID
router.get('/:id', getQualificationById);
// POST /api/qualifications - Create new qualification
router.post('/', createQualification);
// PUT /api/qualifications/:id - Update qualification by ID
router.put('/:id', updateQualification);
// DELETE /api/qualifications/:id - Delete qualification by ID
router.delete('/:id', deleteQualification);
// DELETE /api/qualifications - Delete all qualifications
router.delete('/', deleteAllQualifications);
export default router;