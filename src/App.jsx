import "./App.css";
import DesktopLayout from "./layouts/desktopLayout";
import QuestionPage from "./Pages/QuestionPage/QuestionPage";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { io } from "socket.io-client";
import ControllerPage from "./Pages/ControllerPage/ControllerPage";
const socket = io.connect(import.meta.env.VITE_SERVER_URI);

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <DesktopLayout>
              <Home socket={socket} />
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
        <Route path="/controller/:id" element={<ControllerPage />} />
        {/* <Route path="/controller/:qid" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
