const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminsSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
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
    minLength: 3,
    maxLength: 15,
    match: /^[A-Za-z]+$/,
    required: true,
  },
  dni: {
    type: Number,
    length: 8,
    required: true,
  },
  phone: {
    type: String,
    length: 10,
    required: true,
  },
  email: {
    type: String,
    match: /^[^@]+@[^@]+.[a-zA-Z]{2,}$/,
    required: true,
  },
  city: {
    type: String,
    minLength: 2,
    maxLength: 10,
    required: true,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model('Admin', adminsSchema);
