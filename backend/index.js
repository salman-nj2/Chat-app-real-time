// Libraries

const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { addUser } = require("./entity");
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

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);
    const { user, error } = addUser({ id: socket.id, name: name, room: room });
    console.log(user);
    if (error) {
      callback(error);
      return;
    }
    console.log(user);
    socket.join(user.room);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});
// run server

server.listen(8000, () => {
  console.log("listening on port 8000");
});
