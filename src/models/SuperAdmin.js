const mongoose = require('mongoose');

const { Schema } = mongoose;

const superAdminsSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: /^[^@]+@[^@]+.[a-zA-Z]{2,}$/,
    required: true,
  },
});

module.exports = mongoose.model('SuperAdmin', superAdminsSchema);
