import { useEffect } from "react";
import Controller from "../../layouts/ControllerLayout";
import styles from "./ControllerHome.module.css";

import logo from "../../assets/images/cventlogo.svg";
import { useSocket } from "../../utils/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useWebRTC } from "../../utils/WebRTCContext";

const ControllerHome = ({ isConnected }) => {
  const socket = useSocket();
  const { dataChannel, peerConnection, startConnection } = useWebRTC();
  const navigate = useNavigate();

  useEffect(() => {
    // if (!peerConnection) {
    startConnection();
    // }
  }, []);

  const createAndSendOffer = async () => {
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Send the offer through the signaling server
      socket.emit("offer", offer);
    } catch (error) {
      console.error("Error creating an offer:", error);
    }
  };
  useEffect(() => {
    if (!peerConnection) return;
    if (!socket) return;
    // Handle ICE candidate event
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate);
      }
    };

    // Function to initiate the offer creation process
    // Call this function based on your application's logic, e.g., a button click
    // const initiateConnection = () => {
    createAndSendOffer();
    // };
  }, [socket, peerConnection]);

  const clickHandler = () => {
    if (!socket.connected) {
      return alert("Desktop not connected");
    }

    // Send message through the WebRTC data channel
    const data = JSON.stringify({ action: "navigate", next: 2 });
    console.log({ dataChannel });
    if (dataChannel && dataChannel.readyState === "open") {
      dataChannel.send(data);
      navigate("/controller/2");
    } else {
      console.error("Data channel is not ready");
    }
    return;
  };

  if (socket == null) return <div>Loading...</div>;

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
