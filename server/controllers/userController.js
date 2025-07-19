const User = require('../models/User');

// Save or update user
const saveUser = async (username, socketId) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    existingUser.socketId = socketId;
    return await existingUser.save();
  }
  const user = new User({ username, socketId });
  return await user.save();
};

// Get all users
const getAllUsers = async () => {
  return await User.find();
};

// Remove user by socketId
const removeUser = async (socketId) => {
  return await User.deleteOne({ socketId });
};

module.exports = {
  saveUser,
  getAllUsers,
  removeUser,
};
