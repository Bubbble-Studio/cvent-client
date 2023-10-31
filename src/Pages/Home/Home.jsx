import React from "react";
import styles from "./Home.module.css";
import logo from "../../assets/images/cventlogo.svg";
const Home = ({ socket }) => {
  React.useEffect(() => {
    socket.emit("join-room", "desktop");
  }, []);
  socket.on("user-connected", (data) => {
    console.log(data);
  });
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src={logo} alt="logo" />
        <p>Willkommen zur Cvent Tech Tour</p>
      </div>
    </div>
  );
};

export default Home;
