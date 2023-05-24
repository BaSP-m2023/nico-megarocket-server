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
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  trainer: {
    type: [Schema.Types.ObjectId],
    ref: 'Trainer',
    required: true,
  },
  activity: {
    type: Schema.Types.ObjectId,
    ref: 'Activity',
    required: true,
  },
  slots: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 20,
  },
});

module.exports = mongoose.model('class', classSchema);
