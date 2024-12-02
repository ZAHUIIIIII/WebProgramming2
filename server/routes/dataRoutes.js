const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/dataController');
const { protect } = require('../middleware/authMiddleware');

// Get all employees (public)
router.get('/employees', getAllEmployees);

// Get a specific employee by ID (public)
router.get('/employees/:id', getEmployeeById);

// Create a new employee (protected)
router.post('/employees', protect, createEmployee);

// Update an existing employee (protected)
router.put('/employees/:id', protect, updateEmployee);

// Delete an employee (protected)
router.delete('/employees/:id', protect, deleteEmployee);

module.exports = router;