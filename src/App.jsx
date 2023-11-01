import "./App.css";
import DesktopLayout from "./layouts/DisplayLayout";
import QuestionPage from "./Pages/QuestionPage/QuestionPage";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ControllerPage from "./Pages/ControllerPage/ControllerPage";
import ControllerHome from "./Pages/ControllerHome/ControllerHome";
import { SocketProvider } from "./utils/GlobalContext";
import { WebRTCProvider } from "./utils/WebRTCContext";

function AppWrapper() {
  return (
    <SocketProvider>
      <WebRTCProvider>
        <App />
      </WebRTCProvider>
    </SocketProvider>
  );
}

function App() {
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
      <Route path="/controller" element={<ControllerHome />} />
      <Route path="/controller/:id" element={<ControllerPage />} />
      {/* <Route path="/controller/:qid" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppWrapper;
