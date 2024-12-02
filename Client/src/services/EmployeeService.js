import axios from 'axios';

const API_URL = 'http://localhost:3000/api/employees';

class EmployeeService {
  getEmployees() {
    return axios.get(API_URL);
  }

  getEmployeeById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createEmployee(employee) {
    return axios.post(API_URL, employee);
  }

  updateEmployee(id, employee) {
    return axios.put(`${API_URL}/${id}`, employee);
  }

  deleteEmployee(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new EmployeeService();