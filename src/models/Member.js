const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
  firstName: String,
  lastName: String,
  birthday: Date,
  phone: Number,
  email: String,
  city: String,
  postal_code: String,
  is_active: Boolean,
  membership: String,
});

module.exports = mongoose.model('Member', memberSchema);
