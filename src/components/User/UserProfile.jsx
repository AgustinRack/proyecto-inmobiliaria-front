import React from "react";
import Name from "./Name";
import LastName from "./LastName";
import Email from "./Email";
import PhoneNumber from "./PhoneNumber";

export default function UserProfile() {
  return (
    <div>
      <h3>Mis Datos</h3>
      <Name />
      <LastName />
      <Email />
      <PhoneNumber />
    </div>
  );
}

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Button, Form } from "react-bootstrap";
// import axios from "axios";
// import useInput from "../../hook/useInput";
// import { loginSuccess } from "../../state/user/userSlice";

// const UserProfile = () => {
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const name = useInput(user.name);
//   const lastName = useInput(user.lastName);
//   const email = useInput(user.email);
//   const phoneNumber = useInput(user.phoneNumber);

//   const handleEdit = async () => {
//     const formData = {
//       name: name.value,
//       lastName: lastName.value,
//       email: email.value,
//       phoneNumber: phoneNumber.value,
//     };

//     try {
//       const editedUser = await axios.put("/user/edit", formData);
//       console.log(editedUser.data);
//       dispatch(loginSuccess(editedUser.data));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Mis Datos</h2>
//       <Form>
//         <Form.Group controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control {...name} />
//         </Form.Group>

//         <Form.Group controlId="lastName">
//           <Form.Label>Last Name</Form.Label>
//           <Form.Control {...lastName} />
//         </Form.Group>

//         <Form.Group controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control {...email} />
//         </Form.Group>

//         <Form.Group controlId="phoneNumber">
//           <Form.Label>Phone Number</Form.Label>
//           <Form.Control {...phoneNumber} />
//         </Form.Group>

//         <Button variant="primary" onClick={handleEdit}>
//           Edit
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default UserProfile;
