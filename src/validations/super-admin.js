const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const superAdminValidation = Joi.object({
    email: Joi.string()
      .email(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .messages({
        'string.pattern.base':
        'The password must contain at least one lowercase letter, one uppercase letter, and one digit',
      }),
  });
  const validation = superAdminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateUpdate,
};
