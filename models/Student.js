const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Student email is required']
  },
  studentId: {
    type: String,
    unique: true,
    required: [true, 'Student ID is required']
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('Student', studentSchema);
