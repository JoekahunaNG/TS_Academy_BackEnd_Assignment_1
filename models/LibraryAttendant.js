const mongoose = require('mongoose');

const attendantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Attendant name is required']
  },
  staffId: {
    type: String,
    unique: true,
    required: [true, 'Staff ID is required']
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('LibraryAttendant', attendantSchema);
