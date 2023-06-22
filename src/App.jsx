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
import PropertyCreate from "./components/Admin/PropertyCreate";
import Favorites from "./components/Favorites/Favorites";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      if (user.isAuthenticated) {
        try {
          const user = await axios.get(`${settings.axiosURL}/users/secret`);
          await dispatch(loginSuccess(user.data));
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
        }
      }
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
            <Route path="/favorites" element={<Favorites />} />
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
            <Route path="/user/visits" element={<UserVisits />} />
            <Route path="/admin/create/property" element={<PropertyCreate />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
