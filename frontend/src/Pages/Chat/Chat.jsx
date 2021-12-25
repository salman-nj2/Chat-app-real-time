import io from "socket.io-client";
import React, { useEffect } from "react";
let socket;
function Chat() {
  const backendUrl = "http://localhost:8000";
  useEffect(() => {
    socket = io(backendUrl);
  }, []);
  return <>chat</>;
}

export default Chat;
