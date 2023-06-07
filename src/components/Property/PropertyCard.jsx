import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "bootstrap";

export default function PropertyCard({ property }) {
  const {
    price,
    country,
    neighborhood,
    address,
    size,
    bedrooms,
    bathrooms,
    description,
    img,
  } = property;

  return (
    <Card style={{ width: "18rem" }}>
      <Row>
        <Col xs={4}>
          <Card.Img variant="top" src={img} />
        </Col>
        <Col xs={8}>
          <Card.Body>
            <Card.Title>{price}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Country: {country}</ListGroup.Item>
              <ListGroup.Item>Neighborhood: {neighborhood}</ListGroup.Item>
              <ListGroup.Item>Address: {address}</ListGroup.Item>
              <ListGroup.Item>Size: {size}</ListGroup.Item>
              <ListGroup.Item>Bedrooms: {bedrooms}</ListGroup.Item>
              <ListGroup.Item>Bathrooms: {bathrooms}</ListGroup.Item>
            </ListGroup>
            <Card.Link href="#">favoritos</Card.Link>
            <Card.Link href="#">agenda tu visita</Card.Link>
            <Card.Link href="#">ver mas</Card.Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
