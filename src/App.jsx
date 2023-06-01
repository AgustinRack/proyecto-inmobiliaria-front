import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/SingUp";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<Signup />} />
      </Routes>
      <p>hola mundo</p>;
    </BrowserRouter>
  );
}

export default App;
