import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isLoggedIn = true;

  let navbarContent;

  if (isLoggedIn) {
    navbarContent = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/venta">
            En Venta
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/alquiler">
            En Alquiler
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/agenda">
            Agenda tu Visita
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/servicios">
            Nuestros Servicios
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/perfil">
            Mi Perfil
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/nosotros">
            Nosotros
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contacto">
            Contacto
          </Link>
        </li>
      </ul>
    );
  } else {
    navbarContent = <span>HOUSE OF DEV</span>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">{navbarContent}</div>
    </nav>
  );
}

export default Navbar;
