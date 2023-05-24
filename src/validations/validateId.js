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

module.exports = { validateId };
