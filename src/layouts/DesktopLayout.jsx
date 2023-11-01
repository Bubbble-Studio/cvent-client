import React from "react";
import styles from "./desktopLayout.module.css";
import { useSocket } from "../utils/GlobalContext";
import { useNavigate } from "react-router-dom";
const DesktopLayout = ({ children }) => {
  const socket = useSocket();
  const navigate = useNavigate();
  if (socket == null) return <div>loading</div>;
  socket.on("navigate", (data) => {
    console.log(data);
    navigate(`/display/${data}`);
  });
  return (
    <>
      {" "}
      <div className={styles.desktopLayout}>{children}</div>
      <div className={styles.desktopBG} />
    </>
  );
};

export default DesktopLayout;
