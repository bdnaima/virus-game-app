const socket = io();

const playerEl = document.querySelector('#player-form');

let playerName = null;

const addNoticeToGame = (notice) => {
    const noticeEl = document.createElement('li');
    noticeEl.classList.add('list-group-item', 'list-group-item-light', 'notice');

    noticeEl.innerHTML = notice;

    document.querySelector('#entry').appendChild(noticeEl);
}

const updateOlinePlayers = (players) => {
    document.querySelector('#online-players').innerHTML = players.map(player => `<li class="player">${player}</li>`).join("");
}

playerEl.addEventListener('submit', e => {
    e.preventDefault();

    playerName = document.querySelector("#name-entry")
    
    //Remove input and button after submitting data.
    document.querySelector('#title').style.display = 'none';
    // document.querySelector('#enter-game').style.display = 'none';
    // document.querySelector('#name-entry').style.display ='none';

    //Emit player
    socket.emit('player-connected', playerName.value, (status) => {
        console.log("Server has seen the registration.", status);
        if (status.joinChat) {
            updateOlinePlayers(status.onlinePlayers);
        }
    });

    return false;
});

socket.on('online-players', (players) => {
    updateOlinePlayers(players);
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
