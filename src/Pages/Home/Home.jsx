import { useEffect } from "react";
import styles from "./Home.module.css";
import logo from "../../assets/images/cventlogo.svg";
import { useSocket } from "../../utils/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useWebRTC } from "../../utils/WebRTCContext";

const Home = () => {
  const socket = useSocket();
  const { dataChannel, peerConnection, startConnection } = useWebRTC();
  const navigate = useNavigate();

  useEffect(() => {
    if (!peerConnection) {
      startConnection();
    }
  }, []);

  useEffect(() => {
    if (!peerConnection) return;
    if (!socket) return;
    // Listen for offers
    socket.on("offer", async (offer) => {
      try {
        if (peerConnection.signalingState !== "stable") return;

        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        // Send the answer back through the signaling server
        socket.emit("answer", answer);
      } catch (error) {
        console.error("Error responding to offer:", error);
      }
    });

    // Listen for ICE candidates
    socket.on("ice-candidate", (candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }, [peerConnection, socket]);

  useEffect(() => {
    if (dataChannel) {
      dataChannel.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log({ message });
        try {
          const data = JSON.parse(event.data);
          if (data.next) {
            navigate(`/display/${data.next}`);
          }
        } catch (error) {
          console.error("Error parsing data", error);
        }
      };
    }
  }, [dataChannel]);

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
