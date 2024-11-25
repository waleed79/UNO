// const express = require("express");
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// app.use(cors());
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"],
//   },
// });

// let connectedUsers = 0;
// let playerNames: any[] = [];

// server.listen(3001, () => {
//   console.log("SERVER IS LISTENING ON PORT 3001");
// });

// io.on("connection", (socket: any) => {
//   console.log("user connected with a socket id", socket.id);
//   connectedUsers++;
//   socket.on("playerJoined", (name: string) => {
//     console.log("Player Joined", name);
//     //connectedUsers++;
//     playerNames.push(name);

//     // emit a message to all clients when the number of connected users reaches 4
//     if (connectedUsers === 4) {
//       console.log("here");
//       io.sockets.emit("gameReady", playerNames);
//       playerNames = []; // Reset playerNames for the next game
//       //connectedUsers = 0; // Reset connectedUsers for the next game
//     }
//   });

//   // decrement the count of connected users when a user disconnects
//   socket.on("disconnect", () => {
//     connectedUsers--;
//     console.log("Number of connected users: ", connectedUsers);
//   });
// });
// // const express = require("express");
// // const app = express();
// // const http = require("http");
// // const { Server } = require("socket.io");
// // const cors = require("cors");

// // app.use(cors());
// // const server = http.createServer(app);
// // const io = new Server(server, {
// //   cors: {
// //     origin: "http://localhost:3001",
// //     methods: ["GET", "POST"],
// //   },
// // });

// // let connectedUsers = 0;
// // let playerNames: string[] = [];

// // server.listen(3001, () => {
// //   console.log("SERVER IS LISTENING ON PORT 3001");
// // });

// // io.on("connection", (socket: any) => {
// //   console.log("user connected with a socket id", socket.id);

// //   socket.on("playerJoined", (name: string) => {
// //     console.log("Player Joined", name);
// //     connectedUsers++;
// //     playerNames.push(name);

// //     if (connectedUsers === 4) {
// //       console.log("here");
// //       io.sockets.emit("gameReady", playerNames);
// //       playerNames = []; // Reset playerNames for the next game
// //       connectedUsers = 0; // Reset connectedUsers for the next game
// //     }
// //   });

// //   socket.on("nextTurn", (data: any) => {
// //     socket.broadcast.emit("nextTurn", data);
// //   });

// //   socket.on("cardPlayed", (data: any) => {
// //     socket.broadcast.emit("cardPlayed", data);
// //   });

// //   socket.on("disconnect", () => {
// //     connectedUsers--;
// //     console.log("Number of connected users: ", connectedUsers);
// //   });
// // });
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

let connectedUsers = 0;
let playerNames: any[] = [];

server.listen(3001, () => {
  console.log("SERVER IS LISTENING ON PORT 3000");
});

io.on("connection", (socket: any) => {
  console.log("user connected with a socket id", socket.id);

  socket.on("playerJoined", (name: string) => {
    console.log("Player Joined", name);
    connectedUsers++;
    playerNames.push(name);

    // emit a message to all clients when the number of connected users reaches 4
    if (connectedUsers === 4) {
      console.log("here");
      io.sockets.emit("gameReady", playerNames);
      playerNames = []; // Reset playerNames for the next game
      connectedUsers = 0; // Reset connectedUsers for the next game
    }
  });

  // decrement the count of connected users when a user disconnects
  socket.on("disconnect", () => {
    connectedUsers--;
    console.log("Number of connected users: ", connectedUsers);
  });
});
