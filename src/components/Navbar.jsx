import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";

function NavigationBar() {
  const user = useSelector((state) => state.user.userData);
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">{user ? user.name : "HOD."}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">En venta</Nav.Link>
            <Nav.Link href="/">Alquiler</Nav.Link>
            <Nav.Link href="/">Agenda tu visita</Nav.Link>
            <NavDropdown title="más" id="navbarScrollingDropdown">
              {user ? (
                <>
                  <NavDropdown.Item href="/logout">logout</NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              ) : (
                <>
                  <NavDropdown.Item href="/login">login</NavDropdown.Item>
                  <NavDropdown.Item href="/signup">signup</NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              )}
              <NavDropdown.Item href="/">Nuestros servicios</NavDropdown.Item>
              <NavDropdown.Item href="/">Nosotros</NavDropdown.Item>
              <NavDropdown.Item href="/">Contacto</NavDropdown.Item>
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
