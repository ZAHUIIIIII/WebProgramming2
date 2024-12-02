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

router.get('/employees', getAllEmployees);

router.get('/employees/:id', getEmployeeById);

router.post('/employees', protect, createEmployee);

router.put('/employees/:id', protect, updateEmployee);

router.delete('/employees/:id', protect, deleteEmployee);

module.exports = router;