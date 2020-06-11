const socket = io();


document.querySelector('#gamer-form').addEventListener('submit', e => {
    e.preventDefault();

    document.querySelector('#title').style.display = 'none';
    const nameEl = document.querySelector("#name-entry");

    socket.emit('player', nameEl.value );
    nameEl.value = '';

    return false;
});

socket.on('player', (data) => {
    document.querySelector("#entry").innerHTML += `<li class="list-group-item"><strong>${data}</strong> joined the game</li>`;
});
