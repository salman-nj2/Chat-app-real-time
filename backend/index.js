// Libraries

const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { addUser, removeUser, getUser, activeUsers } = require("./entity");
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
    const { response, error } = addUser({
      id: socket.id,
      user: name,
      room: room,
    });

    console.log(response);

    if (error) {
      callback(error);
      return;
    }
    socket.join(response.room);
    socket.emit("message", {
      user: "admin",
      text: `Welcome ${response.user} `,
    });
    socket.broadcast
      .to(response.room)
      .emit("message", { user: "admin", text: `${response.user} has joined` });
    io.to(response.room).emit("activeUsers", activeUsers(response.room));
  });
  socket.on("sendMsg", (message, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: user.user,
        text: message,
        date: new Date()
          .toLocaleTimeString()
          .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3"),
      });
    }
    callback();
  });
  socket.on("disconnect", () => {
    console.log("user disconnect");
    const user = removeUser(socket.id);
    console.log(user);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.user} has left`,
      });
      io.to(user.room).emit("activeUsers", activeUsers(user.room));
    }
  });
});
// run server

server.listen(8000, () => {
  console.log("listening on port 8000");
});
