const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().required(),
    isActive: Joi.boolean().default(false),
    description: Joi.string().required(),
  });

  const validation = activityValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(500).json({
    message: `error, there is something wrong ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};
module.exports = {
  validateCreation,
};
