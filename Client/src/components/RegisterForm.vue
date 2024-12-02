<template>
  <div class="container mx-auto p-6 max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-green-600">Register</h2>
    
    
    <form @submit.prevent="register" class="bg-white p-6 rounded-lg shadow-lg">
      <div class="mb-4">
        <label for="username" 
        class="block font-semibold mb-2 text-gray-700">
        Gmail Address
        </label> 
        <input v-model="username" type="email" id="username" 
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required autocomplete="username" />
      </div>
      
      <div class="mb-4">
        <label for="password" 
        class="block font-semibold mb-2 text-gray-700">
        Password
        </label>
        <input v-model="password" type="password" id="password" 
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required autocomplete="new-password" />
      </div>
      
      
      <div class="mb-4">
        <label for="confirmPassword" 
        class="block font-semibold mb-2 text-gray-700">
        Confirm Password
        </label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" 
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required autocomplete="new-password" />
      </div>
      
      
      <div v-if="errorMessage" class="mb-4 text-red-500 text-center">{{ errorMessage }}</div>
      
      <div class="flex justify-between items-center">
        <button type="submit" 
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Register
        </button>
        
        <router-link to="/login" class="text-green-500 hover:underline">Login</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import AuthService from '../services/AuthService';
import auth from '../store/auth';

export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }zz

      try {
        const response = await AuthService.register({ username: this.username, password: this.password });
        auth.setToken(response.data.token);
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.response.data.message || 'Error registering';
        console.error('Error registering:', error);
      }
    }
  }
};
</script>