const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'classId',
    required: true,
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'members',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
