import "./App.css";
import DesktopLayout from "./layouts/desktopLayout";
import QuestionPage from "./Pages/QuestionPage/QuestionPage";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ControllerPage from "./Pages/ControllerPage/ControllerPage";
import { SocketProvider, useSocket } from "./utils/GlobalContext";
import ControllerHome from "./Pages/ControllerHome/ControllerHome";
import { useState } from "react";

function App() {
  let [isConnected, setIsConnected] = useState(false);
  const socket = useSocket();
  if (socket == null) return <div>loading</div>;
  socket.on("is-desktop-connected", (data) => {
    setIsConnected(data);
    console.log(data);
  });
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DesktopLayout>
            <Home />
          </DesktopLayout>
        }
      />
      <Route
        path="/display/:id"
        element={
          <DesktopLayout>
            <QuestionPage />
          </DesktopLayout>
        }
      />
      <Route
        path="/controller/"
        element={<ControllerHome isConnected={isConnected} />}
      />
      <Route
        path="/controller/:id"
        element={<ControllerPage isConnected={isConnected} />}
      />
      {/* <Route path="/controller/:qid" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
