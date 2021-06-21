const express = require('express');
const app = express();
const http = require('http');
const SocketIO = require('socket.io');
const server = http.createServer(app);
const io = SocketIO(server);

let joinedPlayers = {};
let firstClick = false;
let round = 1;
const TOTALROUNDS = 10;

app.use(express.static('public'));

// Fired upon a connection from client.
io.on('connect', (socket) => {
    let playerName

    socket.emit('joined-players', joinedPlayers);

    socket.on('join', (name) => {
        playerName = name;
        joinedPlayers[name] = 0;


        io.emit('joined-players', joinedPlayers)

        if (Object.keys(joinedPlayers).length == 2) {

            let time = Math.random() * 4000 + 1000;
            let positionX = Math.random() * 100;
            let positionY = Math.random() * 100;

            setTimeout(() => {
                io.emit('show-virus', positionX, positionY);
            }, time);
        };

        //Change position after player clicks image.
        socket.on('player-clicks', () => {

            socket.broadcast.emit("disappear")

            if (firstClick == false) {
                joinedPlayers[name] = joinedPlayers[name] + 1

                firstClick = true;

                if (round == TOTALROUNDS) {
                    const players = Object.keys(joinedPlayers);
                    const playerOne = players[0];
                    const playerTwo = players[1];
                    const scoreOne = joinedPlayers[playerOne];
                    const scoreTwo = joinedPlayers[playerTwo];

                    if (scoreOne > scoreTwo) {
                        io.emit('winner', playerOne, scoreOne, TOTALROUNDS)
                    } else if (scoreTwo > scoreOne) {
                        io.emit('winner', playerTwo, scoreTwo, TOTALROUNDS);
                    } else {
                        io.emit('tie')
                    };

                    joinedPlayers = {};
                    firstClick = false;
                    round = 1;

                } else {
                    let time = Math.random() * 3000 + 1000;
                    let positionY = Math.random() * 100;
                    let positionX = Math.random() * 100;


                    setTimeout(() => {
                        firstClick = false;
                        round = round + 1
                        io.emit('show-virus', positionX, positionY);
                    }, time);

                }
            };
        });
    });

    socket.on('disconnect', () => {
        delete joinedPlayers[playerName]
        io.emit('joined-players', joinedPlayers);
    });
});


const PORT = process.env.PORT || '3000';
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
