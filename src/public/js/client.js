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
    document.getElementById("gameID").innerText = "Opponent's turn";
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

        const inp = document.createElement("input");
        inp.className = "inputID";
        inp.id = "inputID"
        inp.type = "text";
        inp.value = gameID;

        const b = document.createElement("button");
        b.className = "buttonID";
        b.id = "buttonID"
        b.textContent = "Copy";
        b.onclick = copy;

        let parent = document.getElementById("gameID");
        parent.innerText = "Please wait for the other player to join. Your Game ID: ";
        parent.appendChild(inp);
        parent.appendChild(b);


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
            document.getElementById("newGameBtn").remove();
            document.getElementById("btnJoin").remove();
            document.getElementById("txtGameID").remove();
            document.getElementById("storage").remove();
            document.getElementById("gameID").innerText = "Game Started, it's opponent's turn";
            let white;
            if (currentColor === "White") {
                white = true;
                activeTurn = true;
                document.getElementById("gameID").innerText = "Game Started, it's your turn";
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
        document.getElementById("gameID").innerText = "Your Turn";
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