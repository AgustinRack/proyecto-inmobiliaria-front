import React from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const user = useSelector((state) => state.user.userData);
  const { name, lastName, email, phoneNumber } = user;

  return (
    <div>
      <h3>Mis Datos</h3>
      <div>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <p>{name}</p>
          <hr className="separator" />
          <Form.Label>Apellido</Form.Label>
          <p>{lastName}</p>
          <hr className="separator" />
          <Form.Label>Email</Form.Label>
          <p>{email}</p>
          <hr className="separator" />
          <Form.Label>Número de teléfono</Form.Label>
          <p>{phoneNumber}</p>
          <hr className="separator" />
        </Form.Group>
      </div>
      <Button as={Link} to="/user/edit">
        Editar
      </Button>
    </div>
  );
}
