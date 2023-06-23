import React, { useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import * as settings from "../../settings/index";
import axios from "axios";
import { useSelector } from "react-redux";
import useInput from "../../hook/useInput";
import { Card, Container, Image, Row, Col } from "react-bootstrap";

export default function UserVisits() {
  const user = useSelector((state) => state.user);

  const userVisits = useInput([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        if (!user.admin) {
          const visit = await axios.get(
            `${settings.axiosURL}/visits/appointment/user/${user.userData.id}`
          );
          userVisits.onChange({ target: { value: visit.data } });
        } else {
          const visit = await axios.get(`${settings.axiosURL}/admin/visits`);
          userVisits.onChange({ target: { value: visit.data } });
        }
      } catch (error) {
        console.log("fetchVisit error", error);
      }
    };

    fetchVisits();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>Mis Visitas</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
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
              {user.admin && (
                <div>
                  <hr className="my-3" />
                  <h5 className="text-center">Información del usuario:</h5>
                  <Card.Text>Nombre: {visit.user.name}</Card.Text>
                  <Card.Text>Email: {visit.user.email}</Card.Text>
                  <Card.Text>Teléfono: {visit.user.phoneNumber}</Card.Text>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}
