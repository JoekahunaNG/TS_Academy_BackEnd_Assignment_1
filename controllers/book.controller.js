const Book = require('../models/Book');
const Author = require('../models/Author');

// @desc    Create book
// @route   POST /books
exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all books (with Pagination & Search)
// @route   GET /books
exports.getBooks = async (req, res, next) => {
  try {
    let queryObj = {};

    // Search logic (Enhanced to include Author names)
    if (req.query.search) {
      const search = req.query.search;
      
      // Find author IDs that match the search name
      const matchingAuthors = await Author.find({
        name: { $regex: search, $options: 'i' }
      }).select('_id');
      const authorIds = matchingAuthors.map(a => a._id);

      queryObj = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { isbn: { $regex: search, $options: 'i' } },
          { authors: { $in: authorIds } }
        ]
      };
    }

    let query = Book.find(queryObj).populate('authors').populate('borrowedBy').populate('issuedBy');

    // Pagination (Bonus)
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const total = await Book.countDocuments(queryObj);

    query = query.skip(startIndex).limit(limit);

    const books = await query;

    res.status(200).json({
      success: true,
      count: books.length,
      pagination: {
        page,
        limit,
        total
      },
      data: books
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get overdue books
// @route   GET /books/overdue
exports.getOverdueBooks = async (req, res, next) => {
  try {
    const today = new Date();
    
    const books = await Book.find({
      status: 'OUT',
      returnDate: { $lt: today }
    }).populate('authors').populate('borrowedBy').populate('issuedBy');

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single book
// @route   GET /books/:id
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('authors')
      .populate('borrowedBy')
      .populate('issuedBy');

    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// @desc    Update book
// @route   PUT /books/:id
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete book
// @route   DELETE /books/:id
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Borrow book
// @route   POST /books/:id/borrow
exports.borrowBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }

    if (book.status === 'OUT') {
      return res.status(400).json({ success: false, error: 'Book is already borrowed' });
    }

    const { studentId, attendantId, returnDate } = req.body;

    book.status = 'OUT';
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = returnDate;

    await book.save();

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Return book
// @route   POST /books/:id/return
exports.returnBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }

    if (book.status === 'IN') {
      return res.status(400).json({ success: false, error: 'Book is already in the library' });
    }

    book.status = 'IN';
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
};
