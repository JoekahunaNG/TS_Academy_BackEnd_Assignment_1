const express = require('express');
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getOverdueBooks
} = require('../controllers/book.controller');
const validate = require('../middleware/validation.middleware');
const { bookSchema, borrowSchema } = require('../utils/validationSchemas');
const { protect } = require('../middleware/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - isbn
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         isbn:
 *           type: string
 *         authors:
 *           type: array
 *           items:
 *             type: string
 *         status:
 *           type: string
 *           enum: [IN, OUT]
 *         borrowedBy:
 *           type: string
 *         issuedBy:
 *           type: string
 *         returnDate:
 *           type: string
 *           format: date
 *       example:
 *         title: The Great Gatsby
 *         isbn: 9780743273565
 *         authors: [507f1f77bcf86cd799439011]
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing library books
 */

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or ISBN
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: The list of the books
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Successfully created
 */
router.route('/')
  .get(getBooks)
  .post(validate(bookSchema), createBook);

/**
 * @swagger
 * /books/overdue:
 *   get:
 *     summary: Get all books past their return date
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of overdue books
 */
router.get('/overdue', getOverdueBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details
 *   put:
 *     summary: Update book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Updated successfully
 *   delete:
 *     summary: Delete book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.route('/:id')
  .get(getBook)
  .put(validate(bookSchema), updateBook)
  .delete(deleteBook);

/**
 * @swagger
 * /books/{id}/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [studentId, attendantId, returnDate]
 *             properties:
 *               studentId:
 *                 type: string
 *               attendantId:
 *                 type: string
 *               returnDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Borrowed successfully
 *       400:
 *         description: Book already OUT
 */
router.post('/:id/borrow', validate(borrowSchema), borrowBook);

/**
 * @swagger
 * /books/{id}/return:
 *   post:
 *     summary: Return a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returned successfully
 *       400:
 *         description: Book already IN
 */
router.post('/:id/return', returnBook);

module.exports = router;
