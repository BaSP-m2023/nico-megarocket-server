const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().required(),
    isActive: Joi.boolean().default(true),
    description: Joi.string().required(),
  });

  const validation = activityValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `error, there is something wrong ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().pattern(/^[A-Za-z\s]{2,30}$/).messages({
      'string.pattern.base': 'The name must contain only letters(between 2 and 30',
    }),
    description: Joi.string().regex(/^[a-zA-Z0-9]/).min(2).max(100),
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
  validateCreation,
  validateUpdate,
};
