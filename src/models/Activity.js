const { string, boolean } = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: string,
  },
  description: {
    type: string,
  },
  active: {
    type: boolean,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
