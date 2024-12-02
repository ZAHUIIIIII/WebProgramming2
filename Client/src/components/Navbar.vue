<template>
  <nav class="bg-primary p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-white text-lg font-bold">Home</router-link>
      <div>
        <router-link v-if="isLoggedIn" to="/logout" class="text-white px-4 py-2 bg-accent rounded hover:bg-red-600">Logout</router-link>
        <div v-else>
          <router-link to="/login" class="text-white px-4 py-2 bg-accent rounded hover:bg-red-600">Login</router-link>
          <router-link to="/register" class="text-white px-4 py-2 bg-green-500 rounded ml-2 hover:bg-green-600">Register</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import auth from '../store/auth';

export default {
  name: 'Navbar',
  computed: {
    isLoggedIn() {
      return auth.isLoggedIn();
    }
  }
};
</script>