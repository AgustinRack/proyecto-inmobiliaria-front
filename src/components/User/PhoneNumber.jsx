import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import useInput from "../../hook/useInput";
import axios from "axios";
import { loginSuccess } from "../../state/user/userSlice";
import * as settings from "../../settings/index";

export default function PhoneNumber() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const id = user.userData.id;
  const phonNumberInput = useInput(user.userData.phoneNumber);

  const handleEdit = () => {
    phonNumberInput.onChange({ target: { value: phonNumberInput.value } });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${settings.axiosURL}/users/edit/phone-number`,
        {
          id: id,
          phoneNumber: phonNumberInput.value,
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
        <Form.Label>PhoneNumber</Form.Label>
        {phonNumberInput.value !== user.phoneNumber ? (
          <Form.Control type="text" {...phonNumberInput} />
        ) : (
          <p>{user.phoneNumber}</p>
        )}
      </Form.Group>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
