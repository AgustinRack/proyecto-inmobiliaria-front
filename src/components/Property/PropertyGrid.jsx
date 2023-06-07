import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import PropertyCard from "./PropertyCard";

export default function PropertyGrid() {
  const properties = useSelector((state) => state.properties);

  return (
    <Row>
      {properties.map((property) => (
        <Col key={property.id} xs={12} sm={6} md={4} lg={3}>
          <PropertyCard property={property} />
        </Col>
      ))}
    </Row>
  );
}
