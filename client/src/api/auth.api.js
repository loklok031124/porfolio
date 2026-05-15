import axios from './axios';

export const authAPI = {
  // Sign In
  signin: async (credentials) => {
    const response = await axios.post('/auth/signin', credentials);
    return response.data;
  },

  // Sign Out
  signout: async () => {
    const response = await axios.post('/auth/signout');
    return response.data;
  },

  // Get Current User
  getCurrentUser: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  }
};