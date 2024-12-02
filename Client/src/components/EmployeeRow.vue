<template>
  <tr class="hover:bg-gray-50">
    <td class="py-2 px-4 border-b text-secondary">{{ employee.name }}</td>
    <td class="py-2 px-4 border-b text-secondary">{{ employee.position }}</td>
    <td class="py-2 px-4 border-b text-secondary">{{ employee.department }}</td>
    <td class="py-2 px-4 border-b text-secondary">{{ employee.contact }}</td>
    <td class="py-2 px-4 border-b">
      <div class="flex space-x-2">
        <router-link :to="'/employee/' + employee._id" class="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-blue-600">View</router-link>
        <router-link v-if="isLoggedIn" :to="'/employee/edit/' + employee._id" class="inline-block px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</router-link>
        <button v-if="isLoggedIn" @click="$emit('delete-employee', employee._id)" class="inline-block px-4 py-2 bg-accent text-white rounded hover:bg-red-600">Delete</button>
      </div>
    </td>
  </tr>
</template>

<script>
import auth from '../store/auth';

export default {
  name: 'EmployeeRow',
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  computed: {
    isLoggedIn() {
      return auth.isLoggedIn();
    }
  }
};
</script>