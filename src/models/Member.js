const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    match: /^[A-Za-z]+$/,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    match: /^[A-Za-z]+$/,
  },
  dni: {
    type: Number,
    required: true,
    minlength: 7,
    maxLength: 8,
  },
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxLength: 12,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 15,
  },
  postalCode: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 5,
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
