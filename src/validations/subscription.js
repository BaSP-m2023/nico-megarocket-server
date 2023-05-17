const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const SubscriptionValidation = Joi.object({
    classId: Joi.string()
      .hex()
      .min(24),
    members: Joi.string()
      .required(),
    date: Joi.date()
      .max('now')
      .required(),
  });

  const validation = SubscriptionValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const subscriptionValidate = Joi.object({
    classId: Joi.string()
      .hex()
      .min(24),
    members: Joi.string()
      .hex()
      .min(24),
    date: Joi.date(),
  });
  const validation = subscriptionValidate.validate(req.body);
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
