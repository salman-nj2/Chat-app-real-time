import io from "socket.io-client";
import React, { useEffect, useState } from "react";
let socket;
function Chat() {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const backendUrl = "http://localhost:8000";
  useEffect(() => {
    socket = io(backendUrl);
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const name = params.get("name");
    const room = params.get("room");

    setUser(name);
    setRoom(room);

    socket.emit("join", { name: name, room: room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);
  return <>chat</>;
}

export default Chat;
