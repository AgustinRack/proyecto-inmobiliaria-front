import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hook/useInput";
import axios from "axios";
import * as settings from "../../settings/index";
import { loginSuccess } from "../../state/user/userSlice";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const nameInput = useInput(user.name);
  const lastNameInput = useInput(user.lastName);
  const emailInput = useInput(user.email);
  const phoneNumberInput = useInput(user.phoneNumber);

  const handleSave = async () => {
    try {
      if (
        !nameInput.value ||
        !lastNameInput.value ||
        !emailInput.value ||
        !phoneNumberInput.value
      ) {
        alert("Complete todos los campos para su perfil");
      } else {
        const response = await axios.put(`${settings.axiosURL}/users/edit`, {
          id: user.id,
          name: nameInput.value,
          lastName: lastNameInput.value,
          email: emailInput.value,
          phoneNumber: phoneNumberInput.value,
        });
        const updatedUser = response.data;
        dispatch(loginSuccess(updatedUser));
        alert("Usuario editado correctamente");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h3>Editar Datos</h3>
      <div>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" {...nameInput} />
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" {...lastNameInput} />
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" {...emailInput} />
          <Form.Label>Número de teléfono</Form.Label>
          <Form.Control type="text" {...phoneNumberInput} />
        </Form.Group>
        <Button onClick={handleSave} as={Link} to="/user/profile">
          Guardar
        </Button>
      </div>
    </div>
  );
}
