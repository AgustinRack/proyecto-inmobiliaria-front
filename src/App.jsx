import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Navbar />
    //<p>hola messi</p>;
  );
}

export default App;
