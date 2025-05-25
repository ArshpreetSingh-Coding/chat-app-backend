const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const chatSocket = require('./sockets/chatSocket');

const app = express();
app.use(express.json());

const messageRoutes = require('./routes/messageRoutes');

// console.log("✅ typeof messageRoutes:", typeof messageRoutes); // should be 'function'
// console.log("✅ messageRoutes:", messageRoutes);
require('dotenv').config();


const server = http.createServer(app);
const io = socketIo(server);
// console.log("messageRoutes typeof:", typeof messageRoutes);
app.use('/api',messageRoutes);

chatSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${3000}`);
    
})