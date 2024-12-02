<template>
  <div class="container mx-auto p-6">
    <div v-if="employee" class="bg-white p-6 rounded-lg shadow-lg">
      <div class="flex items-center mb-6">
        <img :src="employee.profilePicture" alt="Profile Picture" class="w-24 h-24 rounded-full mr-6" />
        <div>
          <h2 class="text-3xl font-bold text-gray-800">{{ employee.name }}</h2>
          <p class="text-lg text-gray-600">{{ employee.position }}</p>
          <p class="text-lg text-gray-600">{{ employee.department }}</p>
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Contact Information</h3>
        <p class="text-lg text-gray-600"><strong>Phone:</strong> {{ employee.contact }}</p>
        <p class="text-lg text-gray-600"><strong>Email:</strong> {{ employee.email }}</p>
      </div>
      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Address</h3>
        <p class="text-lg text-gray-600">{{ employee.address }}</p>
      </div>
      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Date of Joining</h3>
        <p class="text-lg text-gray-600">{{ formatDate(employee.dateOfJoining) }}</p>
      </div>
      <div class="flex space-x-4">
        
        <router-link :to="'/employee/edit/' + employee._id" 
        class="inline-block px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300">
        Edit
        </router-link>
        
        <button @click="goBack" 
        class="inline-block px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300">
        Back
        </button>
      
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      <p>Loading employee details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmployeeDetailView',
  data() {
    return {
      employee: null
    };
  },
  created() {
    this.fetchEmployee();
  },
  methods: {
    async fetchEmployee() {
      try {
        const response = await axios.get(`http://localhost:3000/api/employees/${this.$route.params.id}`);
        this.employee = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  }
};
</script>