const fileSizeManage = (req, res, next) => {
  if (!/^application\/json/.test(req.headers['content-type'])) {
    return next();
  }

  const size = req.headers['content-length'];
  if (size > 83000) {
    return res.status(413).json({
      message: 'Image loaded exceeds the allowed size',
      data: null,
      error: true,
    });
  }
  return next();
};

module.exports = fileSizeManage;
