/**
 * File: qualification.api.js
 * Description: Qualification API calls
 */

import axios from './axios';

export const qualificationAPI = {
  getAll: async () => {
    const response = await axios.get('/qualifications');
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`/qualifications/${id}`);
    return response.data;
  },

  create: async (qualificationData) => {
    const response = await axios.post('/qualifications', qualificationData);
    return response.data;
  },

  update: async (id, qualificationData) => {
    const response = await axios.put(`/qualifications/${id}`, qualificationData);
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`/qualifications/${id}`);
    return response.data;
  }
};