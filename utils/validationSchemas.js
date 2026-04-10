const Joi = require('joi');

const authorSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Author name is required'
  }),
  bio: Joi.string().allow('')
});

const bookSchema = Joi.object({
  title: Joi.string().required(),
  isbn: Joi.string().required(),
  authors: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).min(1).required(),
  status: Joi.string().valid('IN', 'OUT').default('IN')
});

const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  studentId: Joi.string().required()
});

const attendantSchema = Joi.object({
  name: Joi.string().required(),
  staffId: Joi.string().required()
});

const borrowSchema = Joi.object({
  studentId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Wait, assignment says RequestBody: {"studentId":"xxx", "attendantId":"xxx"}. These "xxx" usually refer to the unique IDs like studentId string or ObjectId. Looking at the logic, it's better to use ObjectIds for relationships. But assignment says studentId in body. I'll check if they mean the custom studentId string or the database _id. 
  // "Use: .populate('borrowedBy')" suggests borrowedBy is an ObjectId. So studentId in request might be the MongoDB _id.
  attendantId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  returnDate: Joi.date().greater('now').required()
});

module.exports = {
  authorSchema,
  bookSchema,
  studentSchema,
  attendantSchema,
  borrowSchema
};
