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

const validateCreateClass = (req, res, next) => {
  const classValidation = Joi.object({
    hour: Joi.string()
      .pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
      .required()
      .messages({
        'string.pattern.base': 'Hour format is HH:mm',
      }),

    day: Joi.string()
      .regex(/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/)
      .required()
      .messages({
        'string.pattern.base': 'Day format is dd/mm/yyyy',
      }),

    trainer: Joi.string()
      .hex()
      .length(24)
      .required()
      .messages({
        'string.hex': 'Trainer has to be a alphanumeric ID',
      }),

    activity: Joi.string()
      .hex()
      .length(24)
      .required()
      .messages({
        'string.hex': 'Activity has to be a alphanumeric ID',
        'string.length': 'Activity has 24 characters',
      }),

    slots: Joi.number()
      .required(),
  });

  const validation = classValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `${validation.error.details[0].message}`,
    error: true,
  });
};

module.exports = { validateId, validateCreateClass };
