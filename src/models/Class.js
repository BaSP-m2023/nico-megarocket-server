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
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satueday', 'Sunday'],
  },
  trainer: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  activity: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  slots: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Class', classSchema);
