const express = require('express');
const {
  createAttendant,
  getAttendants
} = require('../controllers/attendant.controller');
const validate = require('../middleware/validation.middleware');
const { attendantSchema } = require('../utils/validationSchemas');

/**
 * @swagger
 * components:
 *   schemas:
 *     LibraryAttendant:
 *       type: object
 *       required:
 *         - name
 *         - staffId
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         staffId:
 *           type: string
 *       example:
 *         name: Alice Smith
 *         staffId: STAFF001
 */

/**
 * @swagger
 * tags:
 *   name: Attendants
 *   description: Library staff management API
 */

const router = express.Router();

/**
 * @swagger
 * /attendants:
 *   get:
 *     summary: Returns the list of all attendants
 *     tags: [Attendants]
 *     responses:
 *       200:
 *         description: List of attendants
 *   post:
 *     summary: Create a new attendant
 *     tags: [Attendants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LibraryAttendant'
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.route('/')
  .get(getAttendants)
  .post(validate(attendantSchema), createAttendant);

module.exports = router;
