const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
  firebaseUid: {
    type: String,
    // required: true,
  },
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
    minLength: 7,
    maxLength: 8,
  },
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 12,
  },
  email: {
    type: String,
    required: true,
    match: /^[^@]+@[^@]+.[a-zA-Z]{2,}$/,
    unique: true,
  },
  city: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 15,
  },
  postalCode: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 5,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  membership: {
    type: String,
    enum: ['Black', 'Classic', 'Only Classes'],
    required: true,
  },
});
module.exports = mongoose.model('member', memberSchema);
