const mongoose = require('mongoose');
const User = require('../models/User');

const tokenSchema = new mongoose.Schema({
  user: {type: Number},
  token: {type: String}
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;