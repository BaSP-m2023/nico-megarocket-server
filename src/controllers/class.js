const classes = require('../models/Class');

const getClasses = (req, res) => {
  classes.find()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'All classes',
          data,
          error: false,
        });
      } else {
        res.status(401).json({
          message: data.message,
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const getClassById = (req, res) => {
  const { id } = req.params;

  classes.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'Class Found',
          data,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Class not found',
          error: true,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: 'An error ocurred',
        error: error.msg,
      });
    });
};

module.exports = { getClasses, getClassById };
