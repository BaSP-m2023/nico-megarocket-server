const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    first_name: Joi.string().min(3).max(15).required(),
    last_name: Joi.string().min(3).max(15).required(),
    dni: Joi.number().positive().min(10000000).max(99999999)
      .required(),
    phone: Joi.number().positive().min(1000000000).max(9999999999)
      .required(),
    email: Joi.string().regex('/^[^@]+@[^@]+.[a-zA-Z]{2,}$/').required(),
    city: Joi.string().min(2).max(10).required(),
    password: Joi.string().regex('/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/').required(),
  });
  const validation = adminValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `Theres was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = { validateCreation };
