const classes = require('../models/Class');

const getClasses = (req, res) => {
  classes.find()
    .then((sub) => res.status(200).json({
      message: 'All classes',
      data: sub,
      error: false,
    }))
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
          message: 'ID found',
          data,
          error: false,
        });
      } else {
        res.status(400).json({
          message: 'ID is not found',
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: 'An error ocurred',
        error,
      });
    });
};

module.exports = { getClasses, getClassById };
