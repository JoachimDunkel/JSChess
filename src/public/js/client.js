let clID = null;
let gameID = null;
let currentColor = null;
let gameObject = null;
let viewObject = null;
let rotated = false;
let activeTurn = false;

let ws = new WebSocket("ws://localhost:8080");

const newGameBtn = document.getElementById("newGameBtn");
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

newGameBtn.addEventListener("click", e => {
    const payload = {
        "method": "create",
        "clientID": clID
    }
    ws.send(JSON.stringify(payload));
})

function play() {
    activeTurn = false;
    const payload = {
        "method": "play",
        "clientID": clID,
        "gameID": gameID,
        "gameState": gameObject.gameState
    }
    // gameObject.gameState.changeActivePlayer();
    ws.send(JSON.stringify(payload));
}


ws.onmessage = message => {
    const msg = JSON.parse(message.data);

    if (msg.method === "connect") {
        clID = msg.clID;
        console.log("New client: " + clID);
    }

    if (msg.method === "create") {
        gameID = msg.game.id;
        document.getElementById("gameID").innerText = "Please wait for the other player to join. Your Game ID: " + gameID;
        console.log("New game: " + msg.game.id);
    }

    if (msg.method === "join") {
        const game = msg.game;
        console.log("Joined game: " + msg.game.id);
        game.players.forEach(c => {
            if (c.clientID === clID) currentColor = c.color;
            console.log("Color game: " + currentColor);
        })

        if (msg.start) {
            document.getElementById("gameID").remove();
            let white;
            if (currentColor === "White") {
                white = true;
                activeTurn = true;
            } else {
                white = false;
            }
            let init_obj = init(white);
            gameObject = init_obj[0];
            viewObject = init_obj[1];
        }

        // console.log("Joined game: " + msg.game.id);
    }

    if (msg.method === "update") {
        // Get new gamestate from the server
        // Save the gamestate to the webstorage

        let gameState = GameState.fromJsonObject(msg.gameState);
        gameObject.gameState = gameState;
        gameObject.gameState.changeActivePlayer();
        gameObject.updateGameStateEvent.trigger(gameState);
        localStorage.setItem(gameID, msg.gameState);
        console.log("Color: " + gameObject.gameState.myColor);
        activeTurn = true;
        gameObject.startTurn();
    }

    if (msg.method === "error") {
        document.getElementById("gameID").innerText = "Error! " + msg.text;
    }
}

function getColor() {
    if (currentColor === "White") {
        return Player.WHITE;
    } else {
        return Player.BLACK;
    }
}

function getRotated() {
    return rotated;
}

function setRotated(value) {
    rotated = value;
}