import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../../state/property";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  const dispatch = useDispatch();

  const {
    id,
    price,
    country,
    neighborhood,
    address,
    size,
    bedrooms,
    bathrooms,
    description,
    img,
    imgs,
    category,
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
              <ListGroup.Item>Category: {category.categoryName}</ListGroup.Item>
              <ListGroup.Item>Country: {country}</ListGroup.Item>
              <ListGroup.Item>Neighborhood: {neighborhood}</ListGroup.Item>
              <ListGroup.Item>Address: {address}</ListGroup.Item>
              <ListGroup.Item>Size: {size}</ListGroup.Item>
              <ListGroup.Item>Bedrooms: {bedrooms}</ListGroup.Item>
              <ListGroup.Item>Bathrooms: {bathrooms}</ListGroup.Item>
            </ListGroup>
            <Card.Link href="#">favoritos</Card.Link>
            <Card.Link href="#">agenda tu visita</Card.Link>
            <Card.Link
              onClick={() => dispatch(setSelectedProperty(property))}
              as={Link}
              to={`/property/${id}`}
            >
              ver mas
            </Card.Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
