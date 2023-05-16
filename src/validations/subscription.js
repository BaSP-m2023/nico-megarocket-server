const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const subscriptionValidate = Joi.object({
    classId: Joi.string()
      .hex()
      .min(24),
    members: Joi.string(),
    date: Joi.date()
      .max('now'),
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
  validateUpdate,
};
