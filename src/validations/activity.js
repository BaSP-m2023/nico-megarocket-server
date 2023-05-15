const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().pattern(/^[A-Za-z\s]+$/).min(2).messages({
      'string.pattern.base': 'The name must contain only letters',
    }),
    description: Joi.string().regex(/^[a-zA-Z0-9]{5,}$/),
    isActive: Joi.boolean(),
  });
  const validation = activityValidation.validate(req.body);

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
