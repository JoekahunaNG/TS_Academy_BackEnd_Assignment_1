const express = require('express');
const {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/author.controller');
const validate = require('../middleware/validation.middleware');
const { authorSchema } = require('../utils/validationSchemas');

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the author
 *         name:
 *           type: string
 *           description: The name of the author
 *         bio:
 *           type: string
 *           description: A short biography
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the author was added
 *       example:
 *         name: J.K. Rowling
 *         bio: Author of Harry Potter
 */

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: The authors managing API
 */

const router = express.Router();

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Returns the list of all the authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: The list of the authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: The author was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Bad request
 */
router.route('/')
  .get(getAuthors)
  .post(validate(authorSchema), createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get the author by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author id
 *     responses:
 *       200:
 *         description: The author description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The author was not found
 *   put:
 *     summary: Update the author by the id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The author was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The author was not found
 *       400:
 *         description: Bad request
 *   delete:
 *     summary: Remove the author by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author id
 *     responses:
 *       200:
 *         description: The author was deleted
 *       404:
 *         description: The author was not found
 */
router.route('/:id')
  .get(getAuthor)
  .put(validate(authorSchema), updateAuthor)
  .delete(deleteAuthor);

module.exports = router;
