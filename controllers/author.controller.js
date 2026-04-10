const Author = require('../models/Author');

// @desc    Create author
// @route   POST /authors
exports.createAuthor = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all authors
// @route   GET /authors
exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.status(200).json({ success: true, count: authors.length, data: authors });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single author
// @route   GET /authors/:id
exports.getAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ success: false, error: 'Author not found' });
    }
    res.status(200).json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
};

// @desc    Update author
// @route   PUT /authors/:id
exports.updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!author) {
      return res.status(404).json({ success: false, error: 'Author not found' });
    }
    res.status(200).json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete author
// @route   DELETE /authors/:id
exports.deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ success: false, error: 'Author not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
