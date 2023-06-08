import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import useInput from "../../hook/useInput";
import axios from "axios";
import { loginSuccess } from "../../state/user/userSlice";
import * as settings from "../../settings/index";

export default function Name() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const id = user.userData.id;
  const nameInput = useInput(user.userData.name);

  const handleEdit = () => {
    nameInput.onChange({ target: { value: nameInput.value } });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${settings.axiosURL}/users/edit/name`, {
        id: id,
        name: nameInput.value,
      });
      const updatedUser = response.data;
      dispatch(loginSuccess(updatedUser));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        {nameInput.value !== user.name ? (
          <Form.Control type="text" {...nameInput} />
        ) : (
          <p>{user.name}</p>
        )}
      </Form.Group>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
