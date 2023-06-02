import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">HOD.</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/users">En venta</Nav.Link>
            <Nav.Link href="#action2">Alquiler</Nav.Link>
            <Nav.Link href="/users">Agenda tu visita</Nav.Link>
            <NavDropdown title="más" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/login">login</NavDropdown.Item>
              <NavDropdown.Item href="/signup">signup</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Nuestros servicios
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">Nosotros</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Contacto</NavDropdown.Item>
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
