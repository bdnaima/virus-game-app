const socket = io();

const playerEl = document.querySelector('#player-form');

let playerName = null;

const addNoticeToGame = (notice) => {
    const noticeEl = document.createElement('li');
    noticeEl.classList.add('list-group-item', 'list-group-item-light');

    noticeEl.innerHTML = notice;

    document.querySelector('#entry').appendChild(noticeEl);
}

const updateOlinePlayers = (players) => {
    document.querySelector('#online-players').innerHTML = players.map(player => `<li class="list-group-item" style="background-color: green; color: white; font-weight: bold">${player}</li>`)
}

playerEl.addEventListener('submit', e => {
    e.preventDefault();

    playerName = document.querySelector("#name-entry")
    
    //Remove input and button after submitting data.
    document.querySelector('#title').style.display = 'none';
    document.querySelector('#enter-game').style.display = 'none';
    document.querySelector('#name-entry').style.display ='none';

    //Emit player
    socket.emit('player-connected', playerName.value, (status) => {
        console.log("Server has seen the registration.", status);
        if (status.joinChat) {
            updateOlinePlayers(status.onlinePlayers);
        }
    });

    return false;
});

const button = document.querySelector("#start-game");

button.addEventListener('click', () => {
    // between 1,000 and 10,000 milliseconds
    const result = Math.random() * 9000 + 1000;

    setTimeout(() => {    
        document.querySelector("#virus-game").innerHTML = `<img src="assets/pictures/virus.jpg">`;
    }, result);
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
