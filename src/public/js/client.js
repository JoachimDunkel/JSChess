let clID = null;
let gameID = null;
let currentColor = null;
let ws = new WebSocket("ws://localhost:8080");

const btnCreate = document.getElementById("btnCreate");
const btnJoin = document.getElementById("btnJoin");
const inputGame = document.getElementById("txtGameID");
const divPlayers = document.getElementById("divPlayers");
const divBoard = document.getElementById("divBoard");

btnJoin.addEventListener("click", e => {
    if (!gameID) {
        gameID = inputGame.value;
    }
    const payload = {
        "method": "join",
        "clientID": clID,
        "gameID": gameID
    }
    ws.send(JSON.stringify(payload));
})

btnCreate.addEventListener("click", e => {
    const payload = {
        "method": "create",
        "clientID": clID
    }
    ws.send(JSON.stringify(payload));
})

ws.onmessage = message => {
    const msg = JSON.parse(message.data);

    if (msg.method === "connect") {
        clID = msg.clID;
        console.log("New client: " + clID);
    }

    if (msg.method === "create") {
        gameID = msg.game.id;
        console.log("New game: " + msg.game.id);
    }

    if (msg.method === "join") {
        const game = msg.game;

        while(divPlayers.firstChild)
            divPlayers.removeChild(divPlayers.firstChild);

        game.players.forEach(c => {

            const d = document.createElement("div");
            d.style.width = "200px";
            d.style.background = c.color;
            d.textContent = c.clientID;
            divPlayers.append(d);

            if (c.clientID === clID) currentColor = c.color;
        })

        while(divBoard.firstChild)
            divBoard.removeChild(divBoard.firstChild);

        for (let i = 0; i < 20; i++) {
            const b = document.createElement("button");
            b.id = "cell" + (i + 1);
            b.tag = i + 1;
            b.textContent = b.tag;
            b.style.width = "150px"
            b.style.height = "150px"
            b.addEventListener("click", e => {
                b.style.background = currentColor;
                const payload = {
                    "method": "play",
                    "clientID": clID,
                    "gameID": gameID,
                    "cellID": b.tag,
                    "color": currentColor
                }
                ws.send(JSON.stringify(payload));
            })
            divBoard.appendChild(b);
        }

        console.log("Joined game: " + msg.game.id);
    }

    if (msg.method === "update") {
        if (!msg.game.state) return;
        for (const b of Object.keys(msg.game.state)) {
            const color = msg.game.state[b];
            const cellObj = document.getElementById("cell" + b);
            cellObj.style.backgroundColor = color;
        }
    }
}