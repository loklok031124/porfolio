/**
 * File: project.routes.js
 * Student Name: [Your Name]
 * Student ID: [Your ID]
 * Date: [Date]
 * Description: Routes for Project API endpoints
 */

import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects
} from '../controllers/project.controller.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.delete('/', deleteAllProjects);

export default router;