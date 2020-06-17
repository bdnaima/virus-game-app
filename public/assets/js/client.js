const socket = io();

const playerEl = document.querySelector('#player-form');

let playerName = null;


// Player's online list is updated
const showPlayerNames = (joinedPlayers) => {
    const playerNames = Object.keys(joinedPlayers);
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
    document.querySelector('#twoPlayers').style.display = 'none';
    document.querySelector('#enter-game').style.display = 'none';
    document.querySelector('#name-entry').style.display ='none';  

    socket.emit('join', playerName);
});

socket.on('joined-players', (joinedPlayers) => {
    showPlayerNames(joinedPlayers);
});


socket.on('show-virus', (position) => {
    document.querySelector('#players').style.display = 'none';
    document.querySelector("#virus-game").innerHTML =`<img style="position: absolute; top: ${position}%; left: ${position}%;" onclick= "imgDisappear()" src="assets/pictures/virus.jpg">`;
});
// when client clicks, let server know that client has clicked
function imgDisappear() {

    document.querySelector("#virus-game").innerHTML =`<img style="display: none;" src="assets/pictures/virus.jpg">`;

    socket.emit('player-clicks');

};

socket.on('winner', (theWinner, score, total) => {   
    document.querySelector("#virus-game").innerHTML = `<p>${theWinner} won the game with ${score} out of ${total}.</p>`;
    
});

socket.on('tie', () => {
    document.querySelector("#virus-game").innerHTML = `<p>You tied!</p>`;

});