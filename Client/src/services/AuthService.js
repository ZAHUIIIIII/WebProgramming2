import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export default {
  // Register a new user
  register(userData) {
    return axios.post(`${API_URL}/register`, userData);
  },

  // Authenticate user and get token
  login(userData) {
    return axios.post(`${API_URL}/login`, userData);
  }
};