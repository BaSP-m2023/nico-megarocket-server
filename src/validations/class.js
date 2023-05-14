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

module.exports = { validateId };
