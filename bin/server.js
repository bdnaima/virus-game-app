const express = require('express');
const app = express();
const http = require('http');
const SocketIO = require('socket.io');
const server = http.createServer(app);
const io = SocketIO(server);

app.use(express.static('public'));

// Fired upon a connection from client.
io.on('connect', (socket) => {
    socket.on('online-players', (playerName) => {
        io.emit('online-players', playerName)
    });
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));