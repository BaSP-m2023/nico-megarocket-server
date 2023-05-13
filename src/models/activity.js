const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
