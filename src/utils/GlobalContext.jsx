import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({});

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState({});
  const [peerConnection, setPeerConnection] = useState();

  // Initialize WebRTC
  const setupWebRTC = (userType, skt) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        skt.emit("webrtc-ice-candidate", event.candidate);
      }
    };

    if (userType === "controller") {
      const dataChannel = pc.createDataChannel("controller");
      dataChannel.onopen = () => console.log("Data channel opened");
      dataChannel.onclose = () => console.log("Data channel closed");

      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .then(() => {
          skt.emit("webrtc-offer", pc.localDescription);
        });

      dataChannel.onmessage = (e) => {
        console.log("Data received: ", e.data);
        // Handle data channel messages here
      };
      console.log({ pc });
    } else {
      pc.ondatachannel = (event) => {
        const dataChannel = event.channel;
        dataChannel.onmessage = (e) => {
          console.log("Data received: ", e.data);
          // Handle data channel messages here
        };
      };
    }

    // Code to handle offer and answer creation/response if necessary

    setPeerConnection(pc);
  };

  useEffect(() => {
    // Socket setup
    const newSocket = io.connect(import.meta.env.VITE_SERVER_URI);
    console.log({ newSocket });
    newSocket.on("offer", (offer) => {
      peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      peerConnection
        .createAnswer()
        .then((answer) => peerConnection.setLocalDescription(answer))
        .then(() => {
          newSocket.emit("answer", peerConnection.localDescription);
        });
    });

    newSocket.on("answer", (answer) => {
      peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    newSocket.on("candidate", (candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    setSocket({ socket: newSocket, peerConnection, setupWebRTC });

    return () => newSocket.close();
  }, [peerConnection]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
