//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPass from "./components/ResetPass";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ResetPass />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
