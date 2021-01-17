const http = require("http");
const express = require('express');
const { v1: uuidv1 } = require('uuid');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get("/", (req,res) =>
    res.sendFile(__dirname + 'public/index.html'))

app.listen(8081, () => console.log("Listen 8081"))

const webSocket = require("websocket").server
const httpServer = http.createServer();
httpServer.listen(8080, () => console.log("Listen 8080"))

const client_map = {};
const game_map = {};

const wsServer = new webSocket ({
    "httpServer": httpServer
})

wsServer.on("request", request => {
    const conn = request.accept(null, request.origin);
    conn.on("open", () => console.log("Connection Opened"))
    conn.on("close", () => console.log("Connection Closed"))
    conn.on("message", message => {
        const msg = JSON.parse(message.utf8Data)

        if (msg.method === "create") {
            const clID = msg.clientID;
            const gameID = uuidv1();
            game_map[gameID] = {
                "id": gameID,
                "players": []
            }

            const payload = {
                "method": "create",
                "game": game_map[gameID]
            }
            console.log("Cl = " + clID + " " + client_map[clID]);
            const cl_connection = client_map[clID].connection;
            cl_connection.send(JSON.stringify(payload));

            const forJoin = {
                "method": "join",
                "clientID": clID,
                "gameID": game_map[gameID].id
            }
            gameJoin(forJoin);
        }

        if (msg.method === "join") {
            gameJoin(msg);
        }

        if (msg.method === "play") {
            const clID = msg.clientID;
            const gameID = msg.gameID;
            const currentState = msg.gameState;

            const payload = {
                "method": "update",
                "clientID": clID,
                "gameState": currentState
            }

            game_map[gameID].players.forEach(c => {
                if (c.clientID !== clID)
                    client_map[c.clientID].connection.send(JSON.stringify(payload))
            })
        }

        if (msg.method === "load") {
            const clID = msg.clientID;
            const gameID = msg.gameID;

            delete game_map[gameID];

            game_map[gameID] = {
                "id": gameID,
                "players": [],
                "gameState": msg.gameState
            }

            const payload = {
                "method": "create",
                "game": game_map[gameID]
            }
            console.log("Cl = " + clID + " " + client_map[clID]);
            const cl_connection = client_map[clID].connection;
            cl_connection.send(JSON.stringify(payload));

            const forJoin = {
                "method": "join",
                "clientID": clID,
                "gameID": game_map[gameID].id,
                "gameState": msg.gameState
            }
            gameJoin(forJoin);
        }
    })

    const clID = uuidv1();

    client_map[clID] = {
        "connection" : conn
    }

    const payload = {
        "method": "connect",
        "clID": clID
    }

    conn.send(JSON.stringify(payload))
})

function gameJoin(msg) {
    const clID = msg.clientID;
    const gameID = msg.gameID;
    const game = game_map[gameID];
    let state = null;
    if (game_map[gameID].gameState)
        state = game_map[gameID].gameState;

    if (game == null) {
        const payload = {
            "method": "error",
            "text": "Game doesn't exist"
        }
        client_map[clID].connection.send(JSON.stringify(payload))
        return;
    }
    if (game.players.length === 2) {
        const payload = {
            "method": "error",
            "text": "Game already full"
        }
        client_map[clID].connection.send(JSON.stringify(payload))
        return;
    }

    let inGame = false;
    for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].clientID === clID)
            inGame = true;
    }

    if (inGame) {
        const payload = {
            "method": "error",
            "text": "Already in game"
        }
        client_map[clID].connection.send(JSON.stringify(payload))
        return;
    }
    console.log("Join method")

    const color = {"0": "White", "1": "Black"}[game.players.length]

    game.players.push({
        "clientID": clID,
        "color": color
    })

    if (game.players.length  === 2) {
        const payload = {
            "method": "join",
            "start": true,
            "game": game,
            "gameState": state
        }
        console.log("Join method1")
        game.players.forEach(c => {
            client_map[c.clientID].connection.send(JSON.stringify(payload))
        })
    }
}
