const mongoose = require('mongoose');

const { Schema } = mongoose;

const trainerSchema = new Schema({
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 15,
    require: true,
    match: /^[A-Za-z]+$/,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 15,
    require: true,
    match: /^[A-Za-z]+$/,
  },
  dni: {
    type: Number,
    minLength: 8,
    maxLength: 8,
    require: true,
  },
  phone: {
    type: String,
    minLength: 10,
    require: true,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    match: /^[^@]+@[^@]+.[a-zA-Z]{2,}$/,
  },
  city: {
    type: String,
    minLength: 3,
    maxLength: 15,
    require: true,
  },
  salary: {
    type: Number,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('trainer', trainerSchema);
