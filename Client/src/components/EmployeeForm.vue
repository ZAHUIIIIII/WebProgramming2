<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">{{ formTitle }}</h2>
    <form @submit.prevent="submitForm" class="bg-white p-6 rounded shadow">
      <div class="mb-4">
        <label for="name" class="block font-semibold">
          Name
        </label>
        <input v-model="employee.name" type="text" id="name" 
        class="w-full p-2 border border-gray-300 rounded" required />
      </div>

      <div class="mb-4">
        <label for="department" 
        class="block font-semibold">
        Department
        </label>

        <select v-model="employee.department" id="department" 
        class="w-full p-2 border border-gray-300 rounded" required>
          <option value="" disabled>Select Department</option>
          <option v-for="department in departments" :key="department" :value="department">{{ department }}</option>
        </select>
      </div>
      
      
      <div class="mb-4">
        <label for="position" class="block font-semibold">
          Position
        </label>
        
        <select v-model="employee.position" id="position" 
          class="w-full p-2 border border-gray-300 rounded" required>
          <option value="" disabled>Select Position</option>
          <option v-for="position in filteredPositions" :key="position" :value="position">{{ position }}</option>
        </select>
      </div>
      
      <div class="mb-4">
        <label for="contact" 
        class="block font-semibold">Contact</label>
        <input v-model="employee.contact" @input="formatPhoneNumber" type="text" id="contact" 
        class="w-full p-2 border border-gray-300 rounded" required />
      </div>

      <div class="mb-4">
        <label for="email"
        class="block font-semibold">Email</label>
        <input v-model="employee.email" type="email" id="email" 
        class="w-full p-2 border border-gray-300 rounded" required />
      </div>
  
      <div class="mb-4">
        <label for="address" 
        class="block font-semibold">Address</label>
        <input v-model="employee.address" type="text" id="address" 
        class="w-full p-2 border border-gray-300 rounded" required />
      </div>

      <div class="mb-4">
        <label for="dateOfJoining" 
        class="block font-semibold">Date of Joining</label>
        <input v-model="employee.dateOfJoining" type="date" id="dateOfJoining" 
        class="w-full p-2 border border-gray-300 rounded" required />
      </div>
      
      
      <div class="flex justify-end space-x-4">
        <button type="submit" 
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
        <button type="button" @click="cancel" 
        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import defaultAvatar from '../assets/default-avatar.png';

export default {
  name: 'EmployeeForm',
  data() {
    return {
      employee: {
        name: '',
        department: '',
        position: '',
        contact: '',
        email: '',
        address: '',
        dateOfJoining: '',
        profilePicture: ''
      },
      departments: [
        'Software Development',
        'System & Network Administration',
        'Project Management',
        'Technical Support',
        'Design & Research'
      ],
      positions: {
        'Software Development': [
          'Software Engineer / Developer',
          'QA Tester / Software Tester',
        ],
        'System & Network Administration': [
          'System Administrator',
          'Network Engineer',
          'Security Analyst'
        ],
        'Project Management': [
          'Project Manager',
          'Product Manager'
        ],
        'Technical Support': [
          'Technical Support Specialist',
          'IT Support Specialist'
        ],
        'Design & Research': [
          'UX/UI Designer',
          'Research & Development (R&D)',
          'Chief Technology Officer (CTO)'
        ],
      }
    };
  },
  computed: {
    formTitle() {
      return this.$route.params.id ? 'Edit Employee' : 'Add New Employee';
    },
    filteredPositions() {
      return this.positions[this.employee.department] || [];
    }
  },
  methods: {
    formatPhoneNumber(event) {
      let input = event.target.value.replace(/\D/g, ''); 
      if (input.length > 7) {
        input = input.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
      } 
      event.target.value = input;
      this.employee.contact = input;
    },
    async submitForm() {
      // Set default profile picture if not provided
      if (!this.employee.profilePicture) {
        this.employee.profilePicture = defaultAvatar;
      }

      const method = this.$route.params.id ? 'put' : 'post';
      const url = this.$route.params.id
        ? `http://localhost:3000/api/employees/${this.$route.params.id}`
        : 'http://localhost:3000/api/employees';

      try {
        await axios[method](url, this.employee);
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
    cancel() {
      this.$router.push('/');
    },
    async fetchEmployee() {
      if (this.$route.params.id) {
        try {
          const response = await axios.get(`http://localhost:3000/api/employees/${this.$route.params.id}`);
          this.employee = response.data;
          // Format the dateOfJoining to YYYY-MM-DD for the input field
          this.employee.dateOfJoining = new Date(this.employee.dateOfJoining).toISOString().split('T')[0];
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  created() {
    this.fetchEmployee();
  }
};
</script>