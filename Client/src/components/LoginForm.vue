<template>
  <div class="container mx-auto p-6 max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
    <form @submit.prevent="login" class="bg-white p-6 rounded-lg shadow-lg">
      <div class="mb-4">
        <label for="username" class="block font-semibold mb-2 text-gray-700">Gmail Address</label>
        <input v-model="username" type="email" id="username" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required autocomplete="username" />
      </div>
      <div class="mb-4">
        <label for="password" class="block font-semibold mb-2 text-gray-700">Password</label>
        <input v-model="password" type="password" id="password" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required autocomplete="current-password" />
      </div>
      <div v-if="error" class="mb-4 text-red-500 text-center">{{ error }}</div>
      <div class="flex justify-between items-center">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</button>
        <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import auth from '../store/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: this.username,
          password: this.password
        });
        auth.setToken(response.data.token); 
        // Redirect or perform other actions
        this.$router.push('/'); // Example redirect to dashboard
      } catch (error) {
        console.error('Login error:', error);
        if (error.response && error.response.data && error.response.data.msg) {
          this.error = error.response.data.msg;
        } else {
          this.error = 'Invalid credentials. Please try again.';
        }
      }
    }
  }
};
</script>