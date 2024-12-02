import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/main.css';  // Tailwind CSS

// Set the token in axios headers
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Handle token expiration
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    router.push ('/login'); // Redirect to login page
  }
  return Promise.reject(error);
});

createApp(App)
  .use(router)
  .mount('#app');