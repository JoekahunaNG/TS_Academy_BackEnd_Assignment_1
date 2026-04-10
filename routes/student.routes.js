const express = require('express');
const {
  createStudent,
  getStudents,
  getStudent
} = require('../controllers/student.controller');
const validate = require('../middleware/validation.middleware');
const { studentSchema } = require('../utils/validationSchemas');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - studentId
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         studentId:
 *           type: string
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *         studentId: STU001
 */

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management API
 */

const router = express.Router();

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Returns the list of all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.route('/')
  .get(getStudents)
  .post(validate(studentSchema), createStudent);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student details
 */
router.route('/:id')
  .get(getStudent);

module.exports = router;
