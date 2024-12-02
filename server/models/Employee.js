
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dateOfJoining: {
    type: Date,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);