const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: String,
  senderId: String,
  message: String,
  isPrivate: Boolean,
  timestamp: Date,
});

module.exports = mongoose.model('Message', MessageSchema);
