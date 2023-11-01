import { useEffect } from "react";
import Controller from "../../layouts/ControllerLayout";
import styles from "./ControllerHome.module.css";

import logo from "../../assets/images/cventlogo.svg";
import { useSocket } from "../../utils/GlobalContext";
import { useNavigate } from "react-router-dom";

const ControllerHome = ({ isConnected }) => {
  const { setupWebRTC, peerConnection, socket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket?.emit) return;

    // Signal to join the room
    socket.emit("join-room", "controller");

    // Setup WebRTC
  }, [socket]);

  useEffect(() => {
    if (!peerConnection && socket?.connected) {
      console.log({ peerConnection, socket });
      setupWebRTC("controller", socket);
    }
    if (socket?.connected) {
      socket.on("webrtc-answer", (answer) => {
        peerConnection?.setRemoteDescription(new RTCSessionDescription(answer));
      });
    }
  }, [socket, peerConnection]);

  const clickHandler = () => {
    if (!socket.connected) {
      return alert("Desktop not connected");
    }

    // Send message through the WebRTC data channel
    const data = JSON.stringify({ action: "navigate", next: 2 });
    if (socket && peerConnection && peerConnection.dataChannel) {
      peerConnection.dataChannel.send(data);
    }
    navigate("/controller/2");
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
