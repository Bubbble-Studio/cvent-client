import React, { useEffect, useState } from "react";
import Controller from "../../layouts/ControllerLayout";
import styles from "./ControllerHome.module.css";

import logo from "../../assets/images/cventlogo.svg";
import { useSocket } from "../../utils/GlobalContext";
import { useNavigate } from "react-router-dom";
import { SOCKET_EVENTS } from "../../utils/constants";
const ControllerHome = ({ isConnected }) => {
  let socket = useSocket();
  const navigate = useNavigate();
  useEffect(() => {
    if (socket == null) return;
    socket.emit("join-room", "controller");
  }, [socket]);
  if (socket == null) return <div>loading</div>;

  const clickHandler = () => {
    if (isConnected) {
      socket.emit(SOCKET_EVENTS.NAVIGATE_FORWARD, 2);
      navigate("/controller/2");
      return;
    }
    alert("Desktop not connected");
  };
  return (
    <Controller>
      {" "}
      <div className={styles.container}>
        <div className={styles.box}>
          <button onClick={clickHandler} className={styles.button}>
            <img src={logo} alt="logo" />
          </button>
          <p>Willkommen zur Cvent Tech Tour</p>
        </div>
      </div>
    </Controller>
  );
};

export default ControllerHome;
