import React from "react";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const user = useSelector((state) => state.user);
  return <h1>Hola mundo</h1>;
}
