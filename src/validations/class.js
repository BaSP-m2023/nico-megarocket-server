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
    hour: Joi.string()
      .pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
      .messages({
        'string.pattern.base':
        'The field must be a valid hour(for example 09:30 )',
      }),
    day: Joi.string()
      .valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
      .messages({
        'any.only': 'The days can only be Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
      }),
    trainer: Joi.array().items(
      Joi
        .string()
        .hex()
        .min(24),
    ),
    activity: Joi.string()
      .hex()
      .min(24),

    slots: Joi.number()
      .min(1)
      .max(20),
  });
  const validation = classValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `Theres was an error: ${validation.error.details[0].message}`,
    data: undefined,
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
      .valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
      .messages({
        'any.only': 'The Day property has to be a day of the week',
      })
      .required(),
    trainer: Joi.array().items(
      Joi
        .string()
        .hex()
        .length(24)
        .required()
        .messages({
          'string.hex': 'Trainer has to be a alphanumeric ID',
        }),
    ),
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

module.exports = { validateId, validateCreateClass, validateUpdate };
