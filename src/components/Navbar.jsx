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

function NavigationBar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    axios.get(`${settings.axiosURL}/users/logout`);
    dispatch(logoutUser());
    navigate("/");
  };

  return user.admin ? (
    <Navbar className="navbar-admin" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
          {user.isAuthenticated ? user.userData.name : "HOD."}
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
            <Nav.Link as={Link} to="/">
              Visitas
            </Nav.Link>
            <NavDropdown title="más" id="navbarScrollingDropdown">
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
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : (
    <Navbar className="navbar-custom" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
          {user.isAuthenticated ? user.userData.name : "HOD."}
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
            <NavDropdown title="más" id="navbarScrollingDropdown">
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
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
