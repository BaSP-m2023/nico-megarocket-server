const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    dni: Joi.number().positive().integer().min(10000000)
      .max(99999999),
    phone: Joi.string().min(9).max(12).required()
      .messages({
        'number.min': 'Phone number must be at least 9 digits',
        'number.max': 'Phone number must be at most 12 digits',
      }),
    email: Joi.string().email(),
    city: Joi.string().min(5).max(25),
    salary: Joi.number(),
    isActive: Joi.boolean(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .messages({
        'string.pattern.base':
        'The password must contain at least one lowercase letter, one uppercase letter, and one digit',
      }),
  });
  const validation = trainerValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateCreation = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    dni: Joi.number().positive().integer().min(10000000)
      .max(99999999),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .min(9)
      .max(12)
      .required()
      .messages({
        'number.min': 'Phone number must be at least 9 digits',
        'number.max': 'Phone number must be at most 12 digits',
      }),
    email: Joi.string().lowercase().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    city: Joi.string().required().min(3).max(15),
    salary: Joi.number().required(),
    isActive: Joi.boolean(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required()
      .messages({
        'string.pattern.base':
        'The password must contain at least one lowercase letter, one uppercase letter, and one digit',
      }),
  });

  const validation = trainerValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateUpdate,
  validateCreation,
};
