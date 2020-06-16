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

socket.on('online-players', (playerNames) => {
    console.log(playerNames);
    showPlayerNames(playerNames);
});


socket.on('start-game', () => {
});

socket.on('show-virus', (position) => {
    document.querySelector('#players').style.display = 'none';
    document.querySelector("#virus-game").innerHTML =`<img style="position: absolute; top: ${position}%; left: ${position}%;" onclick= "imgDisappear()" src="assets/pictures/virus.jpg">`;
});

function imgDisappear() {
    const clickInSeconds = new Date();
    document.querySelector('#virus-game').innerHTML = `<p>You clicked in: ${clickInSeconds.getSeconds()} seconds</p>`;
};


socket.on('disconnected-player', (playerNames) => {
    showPlayerNames(playerNames);
});