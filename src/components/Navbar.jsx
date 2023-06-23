import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../state/user/userActions";
import axios from "axios";
import * as settings from "../settings/index";
import "../css/navbar.css";
import hLogo from "../assets/hLogo.png";
import odLogo from "../assets/odLogo.png";

function NavigationBar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return user.admin ? (
    <Navbar className="navbar-admin" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
          <img
            src={hLogo}
            alt="H"
            style={{ marginRight: 2, width: 30, height: "auto" }}
          />
          <img src={odLogo} alt="OD" style={{ width: 80, height: "auto" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/for-sale">
              En venta
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Alquiler
            </Nav.Link>
            <Nav.Link as={Link} to="/user/visits">
              Visitas
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/all-users">
              Usuarios
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {user.isAuthenticated && (
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ color: "white", fontFamily: "Arial, sans-serif" }}
          >
            {user.userData.name}
          </Navbar.Brand>
        )}
        <NavDropdown
          title="más"
          id="navbarScrollingDropdown"
          className="custom-nav-dropdown"
        >
          {user.isAuthenticated && (
            <>
              <NavDropdown.Item as={Link} to="/user/profile">
                Mis datos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>logout</NavDropdown.Item>
              <NavDropdown.Divider />
            </>
          )}
          <NavDropdown.Item as={Link} to="/admin/create/property">
            Crear Propiedad
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/">
            Nuestros servicios
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/">
            Nosotros
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/">
            Contacto
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  ) : (
    <Navbar className="navbar-custom" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
          <img
            src={hLogo}
            alt="H"
            style={{ marginRight: 2, width: 30, height: "auto" }}
          />
          <img src={odLogo} alt="OD" style={{ width: 80, height: "auto" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/for-sale">
              En venta
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Alquiler
            </Nav.Link>
            <Nav.Link as={Link} to="/user/visits">
              Mis visitas
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Mis favoritos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {user.isAuthenticated ? (
          <>
            <Navbar.Brand
              as={Link}
              to="/"
              style={{ color: "white", fontFamily: "Arial, sans-serif" }}
            >
              {user.userData.name}
            </Navbar.Brand>
            <NavDropdown
              title="más"
              id="navbarScrollingDropdown"
              className="custom-nav-dropdown"
            >
              {user.isAuthenticated ? (
                <>
                  <NavDropdown.Item as={Link} to="/user/profile">
                    Mis datos
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    logout
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/login">
                    login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup">
                    signup
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              )}
              <NavDropdown.Item as={Link} to="/">
                Nuestros servicios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">
                Nosotros
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">
                Contacto
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <>
            <Navbar.Brand as={Link} to="/login" style={{ color: "white" }}>
              login
            </Navbar.Brand>
            <Navbar.Brand as={Link} to="/signup" style={{ color: "white" }}>
              singup
            </Navbar.Brand>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
