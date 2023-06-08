import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import useInput from "../../hook/useInput";
import axios from "axios";
import { loginSuccess } from "../../state/user/userSlice";
import * as settings from "../../settings/index";

export default function Email() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const id = user.userData.id;
  const emailInput = useInput(user.userData.email);

  const handleEdit = () => {
    emailInput.onChange({ target: { value: emailInput.value } });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${settings.axiosURL}/users/edit/email`,
        {
          id: id,
          email: emailInput.value,
        }
      );
      const updatedUser = response.data;
      dispatch(loginSuccess(updatedUser));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        {emailInput.value !== user.email ? (
          <Form.Control type="text" {...emailInput} />
        ) : (
          <p>{user.email}</p>
        )}
      </Form.Group>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
