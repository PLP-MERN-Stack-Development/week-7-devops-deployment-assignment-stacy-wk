
const { saveMessage } = require('../controllers/messageController');
const { saveUser, removeUser } = require('../controllers/userController');

const users = {};
const typingUsers = {};

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join
    socket.on('user_join', async (username) => {
      users[socket.id] = { username, id: socket.id };
      await saveUser(username, socket.id);
      io.emit('user_list', Object.values(users));
      io.emit('user_joined', { username, id: socket.id });
    });

    // Send message
    socket.on('send_message', async (messageData) => {
      const message = {
        ...messageData,
        id: Date.now(),
        sender: users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        timestamp: new Date().toISOString(),
      };
      await saveMessage(message);
      io.emit('receive_message', message);
    });

    // Typing
    socket.on('typing', (isTyping) => {
      const username = users[socket.id]?.username;
      if (username) {
        isTyping ? typingUsers[socket.id] = username : delete typingUsers[socket.id];
        io.emit('typing_users', Object.values(typingUsers));
      }
    });

    // Private
    socket.on('private_message', async ({ to, message }) => {
      const messageData = {
        id: Date.now(),
        sender: users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        message,
        timestamp: new Date().toISOString(),
        isPrivate: true,
      };
      await saveMessage(messageData);
      socket.to(to).emit('private_message', messageData);
      socket.emit('private_message', messageData);
    });

    // Disconnect
    socket.on('disconnect', async () => {
      const user = users[socket.id];
      if (user) {
        io.emit('user_left', { username: user.username, id: socket.id });
        await removeUser(socket.id);
      }
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(users));
      io.emit('typing_users', Object.values(typingUsers));
    });
  });
};

module.exports = setupSocket;
