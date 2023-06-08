import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import useInput from "../../hook/useInput";
import axios from "axios";
import { loginSuccess } from "../../state/user/userSlice";
import * as settings from "../../settings/index";

export default function LastName() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const id = user.userData.id;
  const lastNameInput = useInput(user.userData.lastName);

  const handleEdit = () => {
    lastNameInput.onChange({ target: { value: lastNameInput.value } });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${settings.axiosURL}/users/edit/last-name`,
        {
          id: id,
          lastName: lastNameInput.value,
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
        {lastNameInput.value !== user.lastName ? (
          <Form.Control type="text" {...lastNameInput} />
        ) : (
          <p>{user.lastName}</p>
        )}
      </Form.Group>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
