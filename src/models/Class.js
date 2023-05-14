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
    type: Schema.Types.ObjectId,
    required: true,
  },
  slots: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Class', classSchema);
