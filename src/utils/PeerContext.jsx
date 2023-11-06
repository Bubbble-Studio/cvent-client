import { createContext, useContext, useEffect, useState } from "react";
import Peer from "peerjs";
import { useSocket } from "./GlobalContext";

const PeerContext = createContext();

export const usePeer = () => useContext(PeerContext);

export const PeerProvider = ({ children }) => {
  const [peer, setPeer] = useState(null);
  const [dataChannel, setDataChannel] = useState(null); // Data channel state
  const [remoteId, setRemoteId] = useState(""); // Remote peer ID [controller
  const socket = useSocket();

  useEffect(() => {
    console.log("USe effect running");
    // if (!socket?.connected) return;
    function removeHttps(url) {
      return url.replace(/https:\/\//, "");
    }
    let config = {
      host: removeHttps(import.meta.env.VITE_SERVER_URI),
      port: 443,
      path: "/peerjs",
      debug: 2,
      secure: true,
    };
    if (import.meta.env.VITE_ENV === "dev") {
      config = {
        host: "localhost",
        port: 8000,
        path: "/peerjs",
        debug: 2,
      };
    }
    const newPeer = new Peer(undefined, config);

    console.log("Peer created");
    // newPeer.on("open", (id) => {
    //   console.log(`My peer ID is: ${id}`);
    //   // socket.emit("controller-peer-id", id);
    // });

    // Handle incoming data connection
    newPeer.on("connection", (conn) => {
      console.log("Incoming connection");
      setDataChannel(conn);
      // Setup data channel event listeners
      // conn.on("data", (data) => {
      //   console.log("Data received", data);
      //   // Handle incoming data
      // });
      // conn.on("open", () => {
      //   console.log("Data channel opened");
      // });
      conn.on("close", () => {
        console.log("Data channel closed");
        // Reset data channel on close
        setDataChannel(null);
      });
    });

    // Handle incoming calls
    newPeer.on("call", (call) => {
      // Answer the call and set up data channel (optional)
      // ...
    });

    setPeer(newPeer);

    // Cleanup
    return () => {
      newPeer.destroy();
    };
  }, [socket]);

  // Context provider value
  const contextValue = {
    peer,
    dataChannel, // Providing data channel through context
    setDataChannel, // Providing a way to set the data channel
    remoteId,
    setRemoteId,
  };

  return (
    <PeerContext.Provider value={contextValue}>{children}</PeerContext.Provider>
  );
};
