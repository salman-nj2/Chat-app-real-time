import io from "socket.io-client";
import React, { useEffect, useState } from "react";
let socket;
function Chat() {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [activeUsers, setActiveUsers] = useState([]);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  console.log("msg", msg);
  const socketUrl = "http://localhost:8000";
  useEffect(() => {
    socket = io(socketUrl);
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
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [socketUrl, window.location.search]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMsg) => [...prevMsg, msg]);
    });
    socket.on("activeUsers", (user) => {
      setActiveUsers(user);
    });
  }, []);
  console.log("messages", messages);
  const sendMessage = (e) => {
    // e.preventDefault();
    socket.emit("sendMsg", msg, () => setMsg(""));
  };
  return (
    <>
      <div>
        <ul>
          {activeUsers.map((user) => (
            <li>{user.user}</li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {messages.map((e, i) =>
            e.user !== user?.toLowerCase() ? (
              <li key={i} style={{ color: "red" }}>
                {JSON.stringify(e)}
              </li>
            ) : (
              <li key={i} style={{ color: "green" }}>
                {JSON.stringify(e)}
              </li>
            )
          )}
        </ul>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <button onClick={(e) => sendMessage(e)}>send</button>
      </div>
    </>
  );
}

export default Chat;
