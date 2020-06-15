const express = require('express');
const app = express();
const http = require('http');
const SocketIO = require('socket.io');
const server = http.createServer(app);
const io = SocketIO(server);
let playerNames = [];



app.use(express.static('public'));



// Fired upon a connection from client.
io.on('connect', (socket) => {
    let playerName = null;

    socket.on('online-players', (name) => {
        playerName = name;
        playerNames.push(name)
        io.emit('online-players', playerNames)
    });



    socket.on('disconnect', () => {
        playerNames = playerNames.filter(name => name != playerName);
        console.log("player has left");
        io.emit('disconnected-player', playerNames);
    });
});


const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));