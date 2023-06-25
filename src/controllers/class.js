const classes = require('../models/Class');

const getClasses = async (req, res) => {
  try {
    const allClasses = await classes.find()
      .populate('trainer')
      .populate('activity');

    return res.status(200).json({
      message: 'Classes list',
      data: allClasses,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'there is an error here',
      data: null,
      error,
    });
  }
};

const getClassById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await classes.findById(id)
      .populate('trainer')
      .populate('activity');

    if (result) {
      return res.status(200).json({
        message: 'Class found',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Class not found',
      data: null,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      error: true,
    });
  }
};
const updateClass = async (req, res) => {
  const { id } = req.params;
  const {
    hour,
    day,
    trainer,
    activity,
    slots,
  } = req.body;

  try {
    const result = await classes.findByIdAndUpdate(
      id,
      {
        hour,
        day,
        trainer,
        activity,
        slots,
      },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: 'Class not found',
        data: null,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Class Updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      error: true,
    });
  }
};

const deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await classes.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: 'Class not found',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Class deleted.',
      data: null,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      error: true,
    });
  }
};

const createClass = async (req, res) => {
  const {
    hour, day, trainer, activity, slots,
  } = req.body;

  try {
    const result = await classes.create({
      hour, day, trainer, activity, slots,
    });

    return res.status(201).json({
      message: 'Class Created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'it cannot be created',
      data: null,
      error,
    });
  }
};

module.exports = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
