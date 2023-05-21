const mongoose = require('mongoose');

const { Schema } = mongoose;

const trainerSchema = new Schema({
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 15,
    required: true,
    match: /^[A-Za-z]+$/,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 15,
    required: true,
    match: /^[A-Za-z]+$/,
  },
  dni: {
    type: Number,
    minLength: 8,
    maxLength: 8,
    required: true,
  },
  phone: {
    type: String,
    minLength: 10,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: /^[^@]+@[^@]+.[a-zA-Z]{2,}$/,
  },
  city: {
    type: String,
    minLength: 3,
    maxLength: 15,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('trainer', trainerSchema);
