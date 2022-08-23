import React from "react";
import ReactDOM from "react-dom/client";
import UserSelect from "./UserSelect";
import VideoPlayer from "./VideoPlayer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserSelect />} />
      <Route path="/video" element={<VideoPlayer />} />
    </Routes>
  </BrowserRouter>
);
