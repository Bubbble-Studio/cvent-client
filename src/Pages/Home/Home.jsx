import { useEffect } from "react";
import styles from "./Home.module.css";
import logo from "../../assets/images/cventlogo.svg";
import { useSocket } from "../../utils/GlobalContext";
import { useNavigate } from "react-router-dom";
import { usePeer } from "../../utils/PeerContext"; // Assuming you have a similar context for Display

const Home = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const { dataChannel, peer } = usePeer(); // Using PeerContext

  useEffect(() => {
    // if (!socket?.connected) return;
    if (peer) {
      peer.on("open", (id) => {
        console.log(`Display's Peer ID: ${id}`);
        socket.emit("display-peer-id", id);
      });
    }
  }, [peer, socket]);

  useEffect(() => {
    console.log({ dataChannel });
    if (dataChannel) {
      dataChannel.on("data", (data) => {
        console.log("Received data:", data);
        // Act on received data
        if (data.action === "navigate") {
          console.log({ data });
          navigate(`/display/${data.next}`);
        }
      });
    }
  }, [dataChannel, navigate]);

  if (!socket) return <div>Loading...</div>;

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
