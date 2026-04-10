const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required']
  },
  isbn: {
    type: String,
    unique: true,
    required: [true, 'ISBN is required']
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, 'At least one author is required']
  }],
  status: {
    type: String,
    enum: ['IN', 'OUT'],
    default: 'IN'
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    default: null
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LibraryAttendant',
    default: null
  },
  returnDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('Book', bookSchema);
