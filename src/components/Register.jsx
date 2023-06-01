import "../css/login.css";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/users/signup", {
        name,
        lastName,
        email,
        password,
      })
      .then((res) => {
        console.log("Usuario creado");
        navigate("/login");
      })
      .catch(() => alert("Se ha producido un error."));
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className="form-control bg-transparent text-white"
            id="nombre"
            placeholder="Ingrese su nombre"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">lastName</label>
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            className="form-control bg-transparent text-white"
            id="apellido"
            placeholder="Ingrese su apellido"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="form-control bg-transparent text-white"
            id="email"
            placeholder="Ingrese su correo electrónico"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="form-control bg-transparent text-white"
            id="password"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control bg-transparent text-white"
            id="password"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit" className="btn text-white">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
