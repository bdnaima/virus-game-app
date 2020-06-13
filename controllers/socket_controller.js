/**
 * Socket Controller
 */
const players = {};

// Get online players names

function getOlinePlayers() {
    return Object.values(players);
}


// Handle player connection
function handlePlayerConnect(playerName, callback) {
    console.log('Player connected to the game', playerName);
    players[this.id] = playerName;
    callback({
        joinChat: true,
        playerNameInUse: false,
        onlinePlayers: getOlinePlayers(),
    });

    //Broadcast when a player connects
    this.broadcast.emit('player-connected', playerName);
}

// Handle when player disconnect
function handlePlayerDisconnect() {

    console.log(`Socket ${this.id} left the game.`);
    //Broadcast that player has left the game.
    if (players[this.id]) {
        this.broadcast.emit('player-disconnected', players[this.id]);
    };
    
    //Remove user from list
    delete players[this.id];
}

// Handle 
function handleGameImage(image) {
    console.log('This is an image', image);

    this.broadcast.emit('image', image);
}


module.exports = function(socket) {
console.log(`Player ${socket.id} has connected!`);

//Connecting to game
socket.on('player-connected', handlePlayerConnect);

// Player disconnects from game.
socket.on('disconnect', handlePlayerDisconnect);

// Players gets image after clicking button
socket.on('image', handleGameImage)

}