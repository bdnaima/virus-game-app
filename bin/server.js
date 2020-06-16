const express = require('express');
const app = express();
const http = require('http');
const SocketIO = require('socket.io');
const server = http.createServer(app);
const io = SocketIO(server);
let playerNames = [];
let playerClicks = 0;

app.use(express.static('public'));

// Fired upon a connection from client.
io.on('connect', (socket) => {
    let playerName 

    socket.emit('online-players', playerNames);

    socket.on('online-players', (name) => {
        playerName = name;
        playerNames.push(name)
        io.emit('online-players', playerNames)

        if (playerNames.length == 2) {
            io.emit('start-game');

            let time = Math.random() * 4000 + 1000;
            let position = Math.random() * 100;

            setTimeout(() => {
                io.emit('show-virus', position);
            }, time);
        };

         //Change position after player clicks image.
         socket.on('player-clicks', () => {
             playerClicks = playerClicks + 1;
             
             // if player clicks 10 times, game ends.
             if (playerClicks == 10 ) {
                 console.log("Game ended");
             };
            console.log(playerClicks);
            let time = Math.random() * 4000 + 1000;
            let position = Math.random() * 100;

            setTimeout(() => {
            io.emit('show-virus', position);
            }, time);
        })

    });

    socket.on('disconnect', () => {
        playerNames = playerNames.filter(name => name != playerName);
        console.log("player has left");
        io.emit('disconnected-player', playerNames);
    });
});


const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));