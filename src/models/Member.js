const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 15,
    match: /^[A-Za-z]+$/,
  },
  lastName: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 15,
    match: /^[A-Za-z]+$/,
  },
  birthday: {
    type: Date,
    required: true,
    Lenght: 10,
  },
  phone: {
    type: Number,
    required: true,
    length: 10,
  },
  email: {
    type: String,
    required: true,
    match: /^[^@]+@[^@]+.[a-zA-Z]{2,}$/,
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
  },
  postalCode: {
    type: String,
    required: true,
    minLenght: 4,
    maxLenght: 5,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  membership: {
    type: String,
    required: true,
    enum: ['Black', 'Classic', 'Only_classes'],
  },
});

module.exports = mongoose.model('Member', memberSchema);
