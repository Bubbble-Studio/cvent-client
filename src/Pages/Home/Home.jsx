import { useEffect } from "react";
import styles from "./Home.module.css";
import logo from "../../assets/images/cventlogo.svg";
import { useSocket } from "../../utils/GlobalContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { socket, peerConnection, setupWebRTC } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log({ socket });
    if (!socket?.emit) return; // Check if the socket is not null
    socket.emit("join-room", "desktop");

    const handleUserConnected = (data) => {
      console.log(data);
    };

    socket.on("user-connected", handleUserConnected);

    return () => {
      if (socket) {
        // socket.off("user-connected", handleUserConnected);
      }
    };
  }, [socket]);

  useEffect(() => {
    if (!peerConnection) return;
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("webrtc-ice-candidate", event.candidate);
      }
    };
    socket.on("webrtc-ice-candidate", (candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }, [peerConnection, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("webrtc-offer", (offer) => {
        peerConnection
          .setRemoteDescription(new RTCSessionDescription(offer))
          .then(() => peerConnection.createAnswer())
          .then((answer) => peerConnection.setLocalDescription(answer))
          .then(() => {
            socket.emit("webrtc-answer", peerConnection.localDescription);
          });
      });
    }
  }, [peerConnection, socket]);

  useEffect(() => {
    console.log({ peerConnection });
    if (!peerConnection?.dataChannel) {
      return;
    }

    const dataChannel = peerConnection.dataChannel;

    dataChannel.onmessage = (event) => {
      console.log("Data received: ", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.next) {
          navigate(`/display/${data.next}`);
        }
      } catch (error) {
        console.error("Error parsing data", error);
      }
    };

    return () => {
      dataChannel.onmessage = null;
    };
  }, [peerConnection, navigate, setupWebRTC]);

  if (!socket) return <div>loading</div>; // Conditional rendering based on socket

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
