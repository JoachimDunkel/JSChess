const http = require("http");
const express = require('express');
const { v1: uuidv1 } = require('uuid');
const app = express();
app.get("/", (req,res) =>
    res.sendFile(__dirname + "/index.html"))

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
        }

        if (msg.method === "join") {
            const clID = msg.clientID;
            const gameID = msg.gameID;
            const game = game_map[gameID];

            if (game.players.length >= 2) {
                return;
            }

            const color = {"0": "White", "1": "Black"}[game.players.length]
            game.players.push({
                "clientID": clID,
                "color": color
            })

            if (game.players.length  === 2)
                updateStates();

            const payload = {
                "method": "join",
                "game": game
            }

            game.players.forEach(c => {
                client_map[c.clientID].connection.send(JSON.stringify(payload))
            })
        }

        if (msg.method === "play") {
            const clID = msg.clientID;
            const gameID = msg.gameID;
            const cellID = msg.cellID;
            const color = msg.color;

            let state = game_map[gameID].state;

            if (!state)
                state = {};

            state[cellID] = color;
            game_map[gameID].state = state;
            updateStates();
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


function updateStates() {

    for (const g of Object.keys(game_map)) {
        const game = game_map[g];
        const payload = {
            "method": "update",
            "game": game
        }

        game.players.forEach(c => {
            client_map[c.clientID].connection.send(JSON.stringify(payload));
        })
    }
}