const { string, boolean } = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: string,
    required: true,
  },
  description: {
    type: string,
    required: true,
  },
  active: {
    type: boolean,
    default: false,
  },
  assignedTo: {
    type: String,
    required: true,
    enum: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
