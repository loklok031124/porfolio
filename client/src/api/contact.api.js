/**
 * File: contact.api.js
 * Description: Contact API calls
 */

import axios from './axios';

export const contactAPI = {
  // Get all contacts
  getAll: async () => {
    const response = await axios.get('/contacts');
    return response.data;
  },

  // Get contact by ID
  getById: async (id) => {
    const response = await axios.get(`/contacts/${id}`);
    return response.data;
  },

  // Create contact
  create: async (contactData) => {
    const response = await axios.post('/contacts', contactData);
    return response.data;
  },

  // Update contact
  update: async (id, contactData) => {
    const response = await axios.put(`/contacts/${id}`, contactData);
    return response.data;
  },

  // Delete contact
  delete: async (id) => {
    const response = await axios.delete(`/contacts/${id}`);
    return response.data;
  }
};