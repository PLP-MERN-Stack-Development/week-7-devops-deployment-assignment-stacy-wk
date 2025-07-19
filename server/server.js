// server.js - Main server file for Socket.io chat application

require("dotenv").config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./config/db');
const setupSocket = require('./socket/socket');

const helmet = require('helmet');
const morgan = require('morgan');
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}



// Load environment variables
dotenv.config();
connectDB();

// Initialize Express app
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

// Routes
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running');
});

// Socket.io
setupSocket(io);


app.get('/health', (req, res) => res.send('OK'));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

