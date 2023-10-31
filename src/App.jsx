import "./App.css";
import DesktopLayout from "./layouts/desktopLayout";
import QuestionPage from "./Pages/QuestionPage/QuestionPage";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ControllerPage from "./Pages/ControllerPage/ControllerPage";
import { SocketProvider } from "./utils/GlobalContext";

function App() {
  return (
    <SocketProvider>
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
        <Route path="/controller/:id" element={<ControllerPage />} />
        {/* <Route path="/controller/:qid" element={<NotFound />} /> */}
      </Routes>
    </SocketProvider>
  );
}

export default App;
