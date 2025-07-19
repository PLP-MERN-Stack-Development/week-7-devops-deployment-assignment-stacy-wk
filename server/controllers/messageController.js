const Message = require('../models/Message');

// Save message to DB
const saveMessage = async (data) => {
  const message = new Message({
    sender: data.sender,
    senderId: data.senderId,
    message: data.message,
    isPrivate: data.isPrivate || false,
    timestamp: data.timestamp || new Date(),
  });
  await message.save();
  return message;
};

// Get latest messages
const getMessages = async () => {
  return await Message.find().limit(100).sort({ timestamp: 1 });
};

module.exports = {
  saveMessage,
  getMessages,
};
