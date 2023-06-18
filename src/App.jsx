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
import { PropertyInfo } from "./components/Admin/PropertyInfo";
import { PropertyEdit } from "./components/Admin/PropertyEdit";
import AppointmentCalendar from "./components/Visits/Calendar";
import UserVisits from "./components/User/UserVisits";

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
            <Route
              path="/visits/appointment"
              element={<AppointmentCalendar />}
            />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/edit" element={<UserEdit />} />
            <Route path="/user/visits" element={<UserVisits />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {user.admin && (
          <>
            <Route
              path="/admin/property/details/:id"
              element={<PropertyInfo />}
            />
            <Route path="/admin/property/edit" element={<PropertyEdit />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
