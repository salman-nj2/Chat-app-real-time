import background from "./background.mp4";
import styles from "./Login.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Login() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  return (
    <>
      <div className={styles.container}>
        <video autoPlay loop muted>
          <source src={background} type="video/mp4" />
        </video>
        <div className={styles.form}>
          <div>Chat World</div>
          <form method="post">
            <input
              type="text"
              placeholder="Enter your name..."
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Room"
              onChange={(e) => setRoom(e.target.value)}
            />
            <Link
              onClick={(e) => (!user || !room ? e.preventDefault() : null)}
              to={`/chat?name=${user}&room=${room}`}
            >
              <input type="submit" value="Join" className={styles.submit} />
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
