const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    dni: Joi.number().min(6).max(8),
    birthday: Joi.date().max('now').custom((value, helpers) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 12) {
        return helpers.error('date.minAge', { minAge: 12 });
      }
      return value;
    }),
    phone: Joi.number().min(8).max(12),
    email: Joi.string().email(),
    city: Joi.string().min(3).max(20),
    postalCode: Joi.string().min(3).max(5),
    isActive: Joi.boolean().default(true),
    membership: Joi.string().valid('Black', 'Classic', 'Only_classes'),
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
};
