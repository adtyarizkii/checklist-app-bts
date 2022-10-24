import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { setAuthToken } from "./config/api";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Checklist from "./pages/Checklist";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checklist" element={<Checklist />} />
      </Routes>
    </>
  );
}

export default App;
