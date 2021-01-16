let clID = null;
let gameID = null;
let currentColor = null;
let ws = new WebSocket("ws://localhost:8080");

const btnCreate = document.getElementById("btnCreate");
const btnJoin = document.getElementById("btnJoin");
const inputGame = document.getElementById("txtGameID");

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

        game.players.forEach(c => {

            if (c.clientID === clID) currentColor = c.color;
        })

        const b = document.createElement("button");
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

        console.log("Joined game: " + msg.game.id);
    }

    if (msg.method === "update") {
        // Send new gamestate to the server
        // Save the gamestate to the webstorage
        if (!msg.game.state) return;
        for (const b of Object.keys(msg.game.state)) {
            const color = msg.game.state[b];
            const cellObj = document.getElementById("cell" + b);
            cellObj.style.backgroundColor = color;
        }
    }
}