const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  hour: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  trainer: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
    enum: ['Box', 'HIIT', 'Crossfit'],
  },
  slots: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Class', classSchema);
