<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold text-primary">CyberGrid Team</h1>
      <router-link v-if="isLoggedIn" to="/employee/create" class="inline-block px-4 py-2 bg-accent text-white rounded hover:bg-red-600">Add New Employee</router-link>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2 px-4 border-b text-left text-secondary">Name</th>
            <th class="py-2 px-4 border-b text-left text-secondary">Position</th>
            <th class="py-2 px-4 border-b text-left text-secondary">Department</th>
            <th class="py-2 px-4 border-b text-left text-secondary">Contact</th>
            <th class="py-2 px-4 border-b text-left text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          <EmployeeRow v-for="employee in employees" :key="employee._id" :employee="employee" @delete-employee="deleteEmployee" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import EmployeeRow from '../components/EmployeeRow.vue';
import EmployeeService from '../services/EmployeeService';
import auth from '../store/auth';

export default {
  name: 'EmployeeListView',
  components: {
    EmployeeRow
  },
  data() {
    return {
      employees: []
    };
  },
  computed: {
    isLoggedIn() {
      return auth.isLoggedIn();
    }
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await EmployeeService.getEmployees();
        this.employees = response.data;
      } catch (error) {
        console.error("There was an error fetching employees:", error);
      }
    },
    async deleteEmployee(id) {
      if (!this.isLoggedIn) return;
      try {
        await EmployeeService.deleteEmployee(id);
        this.fetchEmployees(); // Refresh the employee list
      } catch (error) {
        console.error("There was an error deleting the employee:", error);
      }
    }
  }
};
</script>