import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../state/user/userActions";
import useInput from "../hook/useInput";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
  const email = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const handleNavigate = async (e) => {
      if (user) {
        navigate("/");
      }
    };
    handleNavigate();
  }, [user]);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!email.value || !password.value) {
        alert("¿Tiene una cuenta creada? Complete los campos para ingresar");
      } else {
        await dispatch(loginUser(email.value, password.value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-6">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <p className="mt-3">
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
