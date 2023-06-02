import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as settings from "./settings";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import { Login } from "./components/Login";
import { SignUp } from "./components/SingUp";
import { loginSuccess } from "./state/user/userSlice";

function App() {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   async function fetchUser() {
  //     const user = await axios.get(`${settings.axiosURL}/users/me`);
  //     await dispatch(loginSuccess(user.data));
  //   }
  //   fetchUser();
  // }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
