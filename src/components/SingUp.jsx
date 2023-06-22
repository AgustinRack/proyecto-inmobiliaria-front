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
    try {
      if (
        !name.value ||
        !lastName.value ||
        !email.value ||
        !password.value ||
        !phoneNumber.value
      ) {
        e.preventDefault();
        alert("Complete todos los campos para registrarse");
      } else {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-6">
          <h2>Sign Up</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" {...name} />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                {...lastName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...password}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                {...phoneNumber}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <p className="mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
