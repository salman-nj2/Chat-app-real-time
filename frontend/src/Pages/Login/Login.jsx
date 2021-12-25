import background from "./background.mp4";
import styles from "./Login.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Login() {
  const [user, setuser] = useState("");
  const [room, setroom] = useState("");
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
              onChange={(e) => setuser(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Room"
              onChange={(e) => setroom(e.target.value)}
            />
            <Link
              onClick={(e) => (!user || !room ? e.preventDefault() : null)}
              to={`/chat?name=${user}&room=${room}`}
            >
              <input type="submit" value="Login" className={styles.submit} />
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
