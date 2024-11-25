"use strict";
const { Socket } = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    },
});
let connectedUsers = 0;
server.listen(3001, () => {
    console.log("SERVER IS LISTENING ON PORT 3001");
});
io.on("connection", (socket) => {
    console.log("user connected with a socket id", socket.id);
    socket.on("playerJoined", (name) => {
        console.log("Player Joined", name);
        connectedUsers++;
        // emit a message to all clients when the number of connected users reaches 4
        if (connectedUsers === 4) {
            console.log("here");
            io.emit('gameReady');
        }
    });
    // decrement the count of connected users when a user disconnects
    socket.on('disconnect', () => {
        connectedUsers--;
        console.log("Number of connected users: ", connectedUsers);
    });
});
