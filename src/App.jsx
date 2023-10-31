import { useState } from "react";
import "./App.css";
import DesktopLayout from "./layouts/desktopLayout";
import QuestionPage from "./Pages/QuestionPage/QuestionPage";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <DesktopLayout>
              {" "}
              <Home socket={socket} />
            </DesktopLayout>
          }
        />
        <Route
          path="/:qid"
          element={
            <DesktopLayout>
              <QuestionPage />
            </DesktopLayout>
          }
        />
        {/* <Route path="/controller/" element={<Dashboard />} />
        <Route path="/controller/:qid" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
