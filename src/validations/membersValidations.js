const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    birthday: Joi.date().required(),
    phone: Joi.string().length(10).required()
      .messages({
        'number.min': 'Phone number must be at least 10 digits',
        'number.max': 'Phone number must be at most 10 digits',
      }),
    email: Joi.string().email().required(),
    city: Joi.string().min(3).max(15).required(),
    postal_code: Joi.string().min(4).max(5).required()
      .messages({
        'number.min': 'Postal code must be at least 4 digits',
        'number.max': 'Postal code must be at most 5 digits',
      }),
    is_active: Joi.boolean().required(),
    membership: Joi.string().valid('Black', 'Classic', 'Only_classes').messages({
      'any.only': 'Membership must be one of Black, Classic, or Only_classes',
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

module.exports = {
  validateCreation,
};
