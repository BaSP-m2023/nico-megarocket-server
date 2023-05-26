const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const SubscriptionValidation = Joi.object({
    classId: Joi.string()
      .hex()
      .min(24)
      .required(),
    members: Joi.array().items(
      Joi.string()
        .hex()
        .min(24)
        .required(),
    ).required(),
    date: Joi.date()
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
    members: Joi.array().items(
      Joi.string()
        .hex()
        .min(24),
    ),
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

const validateId = (req, res, next) => {
  const { id } = req.params;

  const validId = /^[0-9a-fA-F]{24}$/;

  if (validId.test(id)) return next();
  return res.status(400).json({
    message: 'Invalid ID',
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateUpdate,
  validateId,
};
