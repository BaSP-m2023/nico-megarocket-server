const mongoose = require('mongoose');

const { Schema } = mongoose;

const superAdminsSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    required: true,
  },
});

module.exports = mongoose.model('Super-Admin', superAdminsSchema);
