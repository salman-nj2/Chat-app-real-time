// Libraries

const express = require("express");
const http = require("http");
const socketio = require("socket.io");

// instances

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

//end points

app.get("/", (req, res) => {
  res.json("working");
});

// socket

io.on("connect", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});
// run server

server.listen(8000, () => {
  console.log("listening on port 8000");
});
