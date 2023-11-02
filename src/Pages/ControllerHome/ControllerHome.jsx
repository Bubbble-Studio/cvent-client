import { useEffect, useState } from "react";
import Controller from "../../layouts/ControllerLayout";
import styles from "./ControllerHome.module.css";
import logo from "../../assets/images/cventlogo.svg";
import { useSocket } from "../../utils/GlobalContext";
import { usePeer } from "../../utils/PeerContext";
import { useNavigate } from "react-router-dom";

const ControllerHome = () => {
  const socket = useSocket();
  const { peer, dataChannel, setDataChannel, remoteId, setRemoteId } =
    usePeer();
  const navigate = useNavigate();

  // Setup peer connection
  useEffect(() => {
    if (peer) {
      peer.on("open", (id) => {
        console.log(`Controller's Peer ID: ${id}`);
        socket.emit("controller-peer-id", id);
      });
    }
  }, [peer, socket]);

  // Handle connection to remote display
  const connectToDisplay = (remotePeerId) => {
    const connection = peer.connect(remotePeerId);

    // Setup data channel events
    connection.on("open", () => {
      console.log("Connected to display");
      setDataChannel(connection); // Update the dataChannel in context
    });
    connection.on("data", (data) => {
      // Handle incoming data if needed
      console.log("Received:", data);
    });
    connection.on("close", () => {
      console.log("Disconnected from display");
      setDataChannel(null);
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on("display-peer-id", (id) => {
        setRemoteId(id);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (remoteId) {
      connectToDisplay(remoteId);
    }
  }, [remoteId]);

  const clickHandler = () => {
    if (dataChannel && dataChannel.open) {
      dataChannel.send({
        action: "navigate",
        next: "2",
      });
      navigate(`/controller/2`);
    }
  };

  return (
    <Controller>
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
