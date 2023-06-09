import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as settings from "./settings";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Login } from "./components/Login";
import { SignUp } from "./components/SingUp";
import ForRent from "./components/ForRent/ForRent";
import ForSale from "./components/ForSale/ForSale";
import { loginSuccess } from "./state/user/userSlice";
import { PropertyDetail } from "./components/Property/PropertyDetail";
import UserProfile from "./components/User/UserProfile";
import UserEdit from "./components/User/UserEdit";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      const user = await axios.get(`${settings.axiosURL}/users/secret`);

      await dispatch(loginSuccess(user.data));
    }
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ForRent />} />
        <Route path="/for-sale" element={<ForSale />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {user.isAuthenticated ? (
          <>
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/edit" element={<UserEdit />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
