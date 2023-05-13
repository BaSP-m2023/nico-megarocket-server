const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminsSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
    match: /^[A-Za-z]+$/,
  },
  last_name: {
    type: String,
    minlength: 5,
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
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    required: true,
  },
});

module.exports = mongoose.model('Admin', adminsSchema);
