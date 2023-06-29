const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(15)
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(15)
      .required(),
    dni: Joi.number()
      .min(10000000)
      .max(99999999),
    birthday: Joi.date()
      .required(),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .length(10)
      .required()
      .messages({
        'number.min': 'Phone number must be at least 10 digits',
        'number.max': 'Phone number must be at most 10 digits',
      }),
    email: Joi.string()
      .email()
      .required(),
    city: Joi.string()
      .min(3)
      .max(15)
      .required(),
    postalCode: Joi.string()
      .min(4)
      .max(5)
      .required()
      .messages({
        'number.min': 'Postal code must be at least 4 digits',
        'number.max': 'Postal code must be at most 5 digits',
      }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .messages({
        'string.pattern.base':
          'The password must contain at least one lowercase letter, one uppercase letter, and one digit',
      }),
    isActive: Joi.boolean(),
    membership: Joi.string()
      .valid('Black', 'Classic', 'Only Classes')
      .messages({
        'any.only': 'Membership must be one of Black, Classic, or Only Classes',
      }),
  });

  const validation = memberValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(50),
    lastName: Joi.string()
      .min(3)
      .max(50),
    dni: Joi.number()
      .min(10000000)
      .max(99999999),
    birthday: Joi.date()
      .max('now'),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .length(10)
      .required()
      .messages({
        'number.min': 'Phone number must be at least 10 digits',
        'number.max': 'Phone number must be at most 10 digits',
      }),
    email: Joi.string()
      .email(),
    city: Joi.string()
      .min(3)
      .max(20),
    postalCode: Joi.string()
      .min(3)
      .max(5),
    isActive: Joi.boolean(),
    membership: Joi.string()
      .valid('Black', 'Classic', 'Only Classes'),
  });

  const validation = memberValidation.validate(req.body);
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
