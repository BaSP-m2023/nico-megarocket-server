const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  hour: {
    type: String,
    required: true,
    match: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
  },
  day: {
    type: String,
    required: true,
    match: /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/,
  },
  trainer: {
    type: String,
    required: true,
    enum: Schema.Types.ObjectId,
    minlength: 24,
  },
  activity: {
    type: String,
    required: true,
    enum: Schema.Types.ObjectId,
    minlength: 24,
  },
  slots: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
});

module.exports = mongoose.model('Class', classSchema);
