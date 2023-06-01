import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../state/user/userActions";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const email = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email.value, password.value));
    navigate("/");
  };

  return;
};
