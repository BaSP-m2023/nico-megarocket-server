const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminsSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
    match: /^[A-Za-z]+$/,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 15,
    match: /^[A-Za-z]+$/,
    required: true,
  },
  dni: {
    type: Number,
    min: 10000000,
    max: 99999999,
    required: true,
  },
  phone: {
    type: Number,
    min: 1000000000,
    max: 9999999999,
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
    maxlength: 10,
    required: true,
  },
  password: {
    type: String,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    required: true,
  },
});

module.exports = mongoose.model('Admin', adminsSchema);
