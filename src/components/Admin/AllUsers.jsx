import React, { useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import * as settings from "../../settings/index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hook/useInput";
import { Card, Container, Image, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setFavorites } from "../../state/favorites";
import { setUserName } from "../../state/userName";

export default function AllUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useInput([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${settings.axiosURL}/admin/all-users`
        );
        allUsers.onChange({ target: { value: response.data } });
      } catch (error) {
        console.log("fetchUsers error", error);
      }
    };
    fetchUsers();
  }, []);

  async function fetchUserFavorites(id, name) {
    try {
      const favorites = await axios.get(
        `${settings.axiosURL}/favorites/all/${id}`
      );
      const favoritesProperties = favorites.data.map(
        (favorite) => favorite.property
      );

      dispatch(setFavorites(favoritesProperties));
      dispatch(setUserName(name));
    } catch (error) {
      console.log(error);
    }
  }

  const handleFavorites = async (id, name) => {
    try {
      await fetchUserFavorites(id, name);
      navigate("/favorites");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>Usuarios</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {allUsers.value.map((user) => (
          <Card key={user.id} style={{ width: "18rem" }}>
            <Card.Body>
              <div>
                <h5 className="text-center">Información del usuario:</h5>
                <Card.Text>Nombre: {user.name}</Card.Text>
                <Card.Text>Apellido: {user.lastName}</Card.Text>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Teléfono: {user.phoneNumber}</Card.Text>
                <Col>
                  <button
                    className="heart-button"
                    onClick={() => handleFavorites(user.id, user.name)}
                  >
                    <span className="heart-icon"></span>
                  </button>
                </Col>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}
