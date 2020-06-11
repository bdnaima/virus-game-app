const socket = io();

const playerEl = document.querySelector('#player-form');

let playerName = null;

const addNoticeToGame = (notice) => {
    const noticeEl = document.createElement('li');
    noticeEl.classList.add('list-group-item', 'list-group-item-light', 'notice');

    noticeEl.innerHTML = notice;

    document.querySelector('#entry').appendChild(noticeEl);
}

playerEl.addEventListener('submit', e => {
    e.preventDefault();

    playerName = document.querySelector("#name-entry")
    
    //Remove input and button after submitting data.
    document.querySelector('#title').style.display = 'none';
    // document.querySelector('#enter-game').style.display = 'none';
    document.querySelector('#name-entry').style.display ='none';

    //Emit player
    socket.emit('player-connected', playerName.value);

    return false;
});

socket.on('player-connected', (playerName) => {
    addNoticeToGame(`${playerName} joined the game.` )
});

socket.on('player-disconnected', (playerName) => {
    addNoticeToGame(`${playerName} left the game.` )
});

socket.on('player', (data) => {
    document.querySelector("#entry").innerHTML += `<li class="list-group-item"><strong>${data}</strong> joined the game</li>`;
});
