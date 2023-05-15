const Joi = require('joi');
const { validate } = require('../models/Trainer');

const validateUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    dni: Joi.number().min(7).max(8),
    phone: Joi.number().min(8).max(14),
    email: Joi.string().email(),
    city: Joi.string().min(5).max(25),
    salary: Joi.number(),
  });

  const validation = trainerValidation.validate(req.body);

  if (!validate.error) return next();
  return res.status(400).json({
    msg: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateUpdate,
};
