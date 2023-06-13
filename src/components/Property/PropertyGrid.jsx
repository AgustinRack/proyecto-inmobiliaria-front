import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import PropertyCard from "./PropertyCard";
import { Button } from "react-bootstrap";

export default function PropertyGrid() {
  const properties = useSelector((state) => state.properties);
  const admin = useSelector((state) => state.user.admin);

  return (
    <Row>
      {properties.map((property) => (
        <Col key={property.id}>
          <PropertyCard property={property} />
        </Col>
      ))}
    </Row>
  );
}
