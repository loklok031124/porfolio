/**
 * File: contact.routes.js
 * Student Name: [Your Name]
 * Student ID: [Your ID]
 * Date: [Date]
 * Description: Routes for Contact API endpoints
 */

import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts
} from '../controllers/contact.controller.js';

const router = express.Router();

// GET /api/contacts - Get all contacts
router.get('/', getAllContacts);

// GET /api/contacts/:id - Get contact by ID
router.get('/:id', getContactById);

// POST /api/contacts - Create new contact
router.post('/', createContact);

// PUT /api/contacts/:id - Update contact by ID
router.put('/:id', updateContact);

// DELETE /api/contacts/:id - Delete contact by ID
router.delete('/:id', deleteContact);

// DELETE /api/contacts - Delete all contacts
router.delete('/', deleteAllContacts);

export default router;