const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  membership: {
    type: String,
    enum: ['Black', 'Classic', 'Only_classes'],
    required: true,
  },
});

module.exports = mongoose.model('Member', memberSchema);
