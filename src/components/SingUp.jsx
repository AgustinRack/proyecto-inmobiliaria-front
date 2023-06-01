import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useInput from "../hook/useInput";
import { registerUser } from "../state/user/userActions";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useInput();
  const lastName = useInput();
  const email = useInput();
  const password = useInput();
  const phoneNumber = useInput();

  const handleRegister = async (e) => {
    e.preventDefault();
    await dispatch(
      registerUser(
        name.value,
        lastName.value,
        email.value,
        password.value,
        phoneNumber.value
      )
    );
    navigate("/login");
  };

  return;
};
