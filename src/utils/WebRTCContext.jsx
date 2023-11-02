import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useSocket } from "./GlobalContext";

const WebRTCContext = createContext();

export const useWebRTC = () => useContext(WebRTCContext);

export const WebRTCProvider = ({ children }) => {
  const [peerConnection, setPeerConnection] = useState(null);
  const [dataChannel, setDataChannel] = useState(null);
  const socket = useSocket(); // Using socket from SocketContext

  const startConnection = useCallback(() => {
    console.log("Called");
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // Google's public STUN server
        // Add TURN server here if you have one
      ],
    });

    const channel = pc.createDataChannel("controller");
    console.log({ channel });
    // channel.onopen = function (event) {
    //   console.log("Data channel is open");
    // };

    // channel.onmessage = function (event) {
    //   console.log("Received message:", event.data);
    // };
    setDataChannel(channel);

    pc.onicecandidate = (event) => {
      if (event.candidate && socket?.connected) {
        socket.emit("ice-candidate", event.candidate);
      }
    };

    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "connected") {
        console.log("Connection established.");
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && socket?.connected) {
        socket.emit("signaling-data", { candidate: event.candidate });
      }
    };

    pc.oniceconnectionstatechange = () => {
      if (
        pc.iceConnectionState === "failed" ||
        pc.iceConnectionState === "disconnected" ||
        pc.iceConnectionState === "closed"
      ) {
        console.error("ICE connection failed:", pc.iceConnectionState);
      }
    };

    // Additional WebRTC event handlers like ontrack
    // ...

    setPeerConnection(pc);
  }, [socket]);

  // Function to handle offer/answer and ICE candidates signaling
  const handleSignalingData = useCallback(
    async (data) => {
      if (data.type === "offer") {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("signaling-data", { type: "answer", sdp: answer.sdp });
      } else if (data.type === "answer") {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data)
        );
      } else if (data.candidate) {
        await peerConnection.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      }
    },
    [peerConnection, socket]
  );

  useEffect(() => {
    // Listen for WebRTC signaling from the server
    if (socket) socket.on("signaling-data", handleSignalingData);
  }, [socket]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [peerConnection]);

  return (
    <WebRTCContext.Provider
      value={{ peerConnection, dataChannel, startConnection }}
    >
      {children}
    </WebRTCContext.Provider>
  );
};
