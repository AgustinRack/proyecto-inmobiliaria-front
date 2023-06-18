import React, { useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import * as settings from "../../settings/index";
import axios from "axios";
import { useSelector } from "react-redux";
import useInput from "../../hook/useInput";
import { Card, Container, Image, Row } from "react-bootstrap";

export default function UserVisits() {
  const user = useSelector((state) => state.user.userData);

  const userVisits = useInput([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const visit = await axios.get(
          `${settings.axiosURL}/visits/appointment/user/${user.id}`
        );
        userVisits.onChange({ target: { value: visit.data } });
      } catch (error) {
        console.log("fetchVisit error", error);
      }
    };

    fetchVisits();
  }, []);

  return (
    <Container>
      <Row>
        {userVisits.value.map((visit) => (
          <Card key={visit.id} style={{ width: "18rem" }}>
            <Card.Body>
              <Image
                src={visit.property.img}
                alt="Property"
                style={{ maxWidth: "100%" }}
              />
              <Card.Text>
                Visita: {visit.date} a las {visit.schedule}:00
              </Card.Text>
              <Card.Text>País: {visit.property.country}</Card.Text>
              <Card.Text>Provincia: {visit.property.province}</Card.Text>
              <Card.Text>Barrio: {visit.property.neighborhood}</Card.Text>
              <Card.Text>Dirección: {visit.property.address}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}
