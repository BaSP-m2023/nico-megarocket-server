const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    dni: Joi.number().required().min(8).max(8),
    phone: Joi.number().required().min(10),
    email: Joi.string().lowercase().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    city: Joi.string().required().min(3).max(15),
    salary: Joi.number().required(),
    isActive: Joi.boolean,
  });

  const validation = trainerValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = { validateCreation };
