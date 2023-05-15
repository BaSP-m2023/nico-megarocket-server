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
  const hour = Joi.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/).required();
  const day = Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/).required();
  const trainer = Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(10)
    .required();
  const activity = Joi.hex.min(24).required();
  const slots = Joi.number().required();

  const hourValidation = hour.validate(req.body.hour);
  const dayValidation = day.validate(req.body.day);
  const trainerValidation = trainer.validate(req.body.trainer);
  const activityValidation = activity.validate(req.body.activity);
  const slotsValidation = slots.validate(req.body.slots);

  const errors = {};

  if (hourValidation.error) {
    errors.hour = hourValidation.error.message;
  }
  if (dayValidation.error) {
    errors.day = dayValidation.error.message;
  }
  if (trainerValidation.error) {
    errors.trainer = trainerValidation.error.message;
  }
  if (activityValidation.error) {
    errors.activity = activityValidation.error.message;
  }
  if (slotsValidation.error) {
    errors.slots = slotsValidation.error.message;
  }

  if (Object.keys(errors).length === 0) return next();

  return res.status(400).json({
    message: 'Error',
    errors,
    error: true,
  });
};

module.exports = { validateId, validateCreateClass };
