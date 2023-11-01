import React from "react";
import styles from "./Home.module.css";
import logo from "../../assets/images/cventlogo.svg";
import { useSocket } from "../../utils/GlobalContext";

const Home = () => {
  const socket = useSocket();
  React.useEffect(() => {
    if (socket == null) return;
    socket.emit("join-room", "desktop");
  }, [socket]);
  if (socket == null) return <div>loading</div>;
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
