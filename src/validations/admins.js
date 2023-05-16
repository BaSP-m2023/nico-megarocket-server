const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(15),
    lastName: Joi.string()
      .min(3)
      .max(15),
    dni: Joi.number()
      .positive()
      .min(10000000)
      .max(99999999),
    phone: Joi.number()
      .positive()
      .min(1000000000)
      .max(9999999999),
    email: Joi.string()
      .pattern(/^[^@]+@[^@]+.[a-zA-Z]{2,}$/)
      .messages({
        'string.pattern.base':
          'The field must be a valid email address(example@gmail.com)',
      }),
    city: Joi.string()
      .min(2)
      .max(10),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .messages({
        'string.pattern.base':
          'The password must contain at least one lowercase letter, one uppercase letter, and one digit',
      }),
  }).min(1);

  const validation = adminValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = { validateUpdate };
