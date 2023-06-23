import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import PropertyCard from "../Property/PropertyCard";
import axios from "axios";
import * as settings from "../../settings/index";
import { setFavorites } from "../../state/favorites";

export default function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const favorites = useSelector((state) => state.favorites);
  const name = useSelector((state) => state.userName);

  async function fetchFavorites() {
    try {
      if (!user.admin) {
        const favorites = await axios.get(
          `${settings.axiosURL}/favorites/all/${user.id}`
        );
        const favoritesProperties = favorites.data.map(
          (favorite) => favorite.property
        );

        dispatch(setFavorites(favoritesProperties));
      }
    } catch (error) {
      console.log("soy el error del fetchFavorites", error);
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body className="text-center">
              {user.admin ? (
                <Card.Title>Favoritos de {name}</Card.Title>
              ) : (
                <Card.Title>Mis Favoritos</Card.Title>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {favorites.length > 0 ? (
          favorites.map((property) => (
            <Col xs={6} key={property.id} style={{ marginBottom: "20px" }}>
              <PropertyCard property={property} />
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <p>Sin favoritos actualmente</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}
