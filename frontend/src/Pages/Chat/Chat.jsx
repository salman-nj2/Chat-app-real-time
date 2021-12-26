import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import grp from "./grp.svg";
import send1 from "./send1.svg";
import activeUser from "./activeUser.svg";
import { Link } from "react-router-dom";

let socket;
function Chat() {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [activeUsers, setActiveUsers] = useState([]);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
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
      setTimeout(() => {
        var objDiv = document.querySelector(".chatbox");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 10);
    });

    socket.on("activeUsers", (user) => {
      setActiveUsers(user);
    });
  }, []);
  const sendMessage = (e) => {
    socket.emit("sendMsg", msg, () => setMsg(""));
    setTimeout(() => {
      var objDiv = document.querySelector(".chatbox");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 10);
  };
  return (
    <>
      <div className="container">
        <div className="activeuser">
          <div>
            Active Users
            <img src={activeUser} alt="users" />
          </div>
          <div>
            {activeUsers.map((e, i) => (
              <div key={i}>
                <span>{e.user}</span>
                <span className="dot"></span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="room">
            <div>
              <img src={grp} alt="grp" />
              <span>{room}</span>
            </div>
            <button>
              <Link to={"/"}>Leave room</Link>
            </button>
          </div>
          <div className="chatbox">
            {messages.map((e, i) =>
              e.user !== user?.toLowerCase() ? (
                <div className="chat left" key={i}>
                  <div>
                    <p>{e.user}</p>
                    <p>{e.date}</p>
                  </div>
                  <div>
                    <p>{e.text}</p>
                  </div>
                </div>
              ) : (
                <div className="chat right" key={i}>
                  <div>
                    <p>{e.user}</p>
                    <p>{e.date}</p>
                  </div>
                  <div>
                    <p>{e.text}</p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="inp">
            <input
              type="text"
              placeholder="Send message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
            />
            <button onClick={(e) => sendMessage(e)}>
              <img src={send1} alt="send" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
