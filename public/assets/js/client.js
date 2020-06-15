const socket = io();

const playerEl = document.querySelector('#player-form');

let playerName = null;
let playerTwo = null;


// Player's online list is updated
const showPlayerNames = (playerNames) => {
    document.querySelector('#online-players').innerHTML = playerNames.map(player =>
    `<li
        class="list-group-item"
        style="background-color: green; color: white; font-weight: bold">
        ${player}
    </li>`);
};

// Player inputs name and enters game-room
playerEl.addEventListener('submit', e => {
    e.preventDefault();

    playerName = document.querySelector("#name-entry").value
    
    //Remove input and button after submitting data.
    document.querySelector('#title').style.display = 'none';
    document.querySelector('#enter-game').style.display = 'none';
    document.querySelector('#name-entry').style.display ='none';

   showPlayerNames([playerName]);

   socket.emit('online-players', playerName);

});

// Start game
const button = document.querySelector("#start-game");

button.addEventListener('click', () => {

    // between 1,000 and 10,000 milliseconds
    const result = Math.random() * 9000 + 1000;

    setTimeout(() => {    
        document.querySelector("#virus-game").innerHTML = `<img src="assets/pictures/virus.jpg">`;
    }, result);

});


socket.on('online-players', (playerNames) => {
    console.log(playerNames);
    showPlayerNames(playerNames);
});

socket.on('disconnected-player', (playerNames) => {
    showPlayerNames(playerNames);
});