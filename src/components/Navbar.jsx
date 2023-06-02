import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavScrollExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/users">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
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

export default NavScrollExample;

// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// function Navbar() {
//   const location = useLocation();
//   const isLoggedIn = true;

//   let navbarContent;

//   if (isLoggedIn) {
//     navbarContent = (
//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <Link className="nav-link" to="/venta">
//             En Venta
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/alquiler">
//             En Alquiler
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/visits">
//             Agenda tu Visita
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/servicios">
//             Nuestros Servicios
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/perfil">
//             Mi Perfil
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/nosotros">
//             Nosotros
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/contact">
//             Contacto
//           </Link>
//         </li>
//       </ul>
//     );
//   } else {
//     navbarContent = <span>HOUSE OF DEV</span>;
//   }

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container">{navbarContent}</div>
//     </nav>
//   );
// }

// export default Navbar;
