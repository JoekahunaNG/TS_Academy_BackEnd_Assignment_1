const LibraryAttendant = require('../models/LibraryAttendant');
const jwt = require('jsonwebtoken');

// @desc    Create attendant
// @route   POST /attendants
exports.createAttendant = async (req, res, next) => {
  try {
    const attendant = await LibraryAttendant.create(req.body);
    
    // Generate token (Bonus: Simple JWT)
    const token = jwt.sign({ id: attendant._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({ success: true, token, data: attendant });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all attendants
// @route   GET /attendants
exports.getAttendants = async (req, res, next) => {
  try {
    const attendants = await LibraryAttendant.find();
    res.status(200).json({ success: true, count: attendants.length, data: attendants });
  } catch (error) {
    next(error);
  }
};
