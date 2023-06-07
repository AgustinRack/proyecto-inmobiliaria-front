import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as settings from "./settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Login } from "./components/Login";
import { SignUp } from "./components/SingUp";
import ForRent from "./components/ForRent/ForRent";
import ForSale from "./components/ForSale/ForSale";
import { loginSuccess } from "./state/user/userSlice";
import { PropertyDetail } from "./components/Property/PropertyDetail";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      const user = await axios.get(`${settings.axiosURL}/users/secret`);
      await dispatch(loginSuccess(user.data));
    }
    if (user.isAuthenticated) fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ForRent />} />
        <Route path="/for-sale" element={<ForSale />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
