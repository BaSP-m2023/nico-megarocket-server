const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminsSchema = new Schema({
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
    type: Number,
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
    minlength: 2,
    maxLength: 10,
    required: true,
  },
  password: {
    type: String,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    required: true,
  },
});

module.exports = mongoose.model('Admin', adminsSchema);
