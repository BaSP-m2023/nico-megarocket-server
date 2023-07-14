const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    dni: Joi.number().positive().min(10000000).max(99999999),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .min(9)
      .max(12),
    email: Joi.string().email(),
    city: Joi.string().min(2).max(10),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    picture: Joi.string().allow(''),
  });

  const validation = adminValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: null,
    error: true,
  });
};

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        'string.pattern.base': 'The name must contain only letters',
      }),
    lastName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        'string.pattern.base': 'The lastName must contain only letters',
      }),
    dni: Joi.number().positive().min(10000000).max(99999999)
      .required(),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .min(9)
      .max(12)
      .required(),
    email: Joi.string()
      .pattern(/^[^@]+@[^@]+.[a-zA-Z]{2,}$/)
      .required()
      .messages({
        'string.pattern.base':
          'The field must be a valid email address(example@gmail.com)',
      }),
    city: Joi.string().min(2).max(10).required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required()
      .messages({
        'string.pattern.base':
          'The password must contain at least one lowercase letter, one uppercase letter, and one digit',
      }),
    picture: Joi.string(),
  });
  const validation = adminValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `Theres was an error: ${validation.error.details[0].message}`,
    data: null,
    error: true,
  });
};

module.exports = { validateCreation, validateUpdate };
