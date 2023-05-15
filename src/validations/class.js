const Joi = require('joi');

const validateId = (req, res, next) => {
  const classValidation = Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).empty().min(24);

  const validateClassId = classValidation.validate(req.params.id);

  if (!validateClassId.error) return next();
  return res.status(400).json({
    message: 'There was error: The ID value is alphanumeric and contain 24 characters',
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const classValidation = Joi.object({
    hour: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/).messages({
      'string.pattern.base':
        'The field must be a valid hour(for example 09:30 )',
    }),
    day: Joi.string().pattern(/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/).messages({
      'string.pattern.base':
        'The field must be a valid day(for example 05/12/2023)',
    }),
    trainer: Joi.hex().min(24),
    activity: Joi.hex.min(24),
    slots: Joi.number(),
  });
  const validation = classValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `Theres was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = { validateId, validateUpdate };
