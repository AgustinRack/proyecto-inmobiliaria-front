import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../../state/property";
import { Link } from "react-router-dom";
// import "../../css/propertyCard.css";
import "../../css/styles.css";

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
    <Card className="Card">
      <Row>
        <Col xs={12} md={4}>
          <Card.Img variant="top" src={img} />
        </Col>
        <Col xs={12} md={8}>
          <Card.Body>
            <Row>
              <Col xs={12} md={6}>
                <span className="price">${price}</span>
              </Col>
              <Col xs={12} md={6}>
                <ListGroup.Item>{neighborhood}</ListGroup.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <ListGroup.Item>Size: {size} m²</ListGroup.Item>
              </Col>
              <Col xs={6} md={4}>
                {category.categoryName !== "terreno" && (
                  <>
                    {bathrooms === 1 ? (
                      <ListGroup.Item>{bathrooms} baño</ListGroup.Item>
                    ) : (
                      <ListGroup.Item>{bathrooms} baños</ListGroup.Item>
                    )}
                  </>
                )}
              </Col>
              <Col xs={6} md={4}>
                {category.categoryName !== "terreno" && (
                  <ListGroup.Item>{bedrooms} dorm.</ListGroup.Item>
                )}
              </Col>
            </Row>
            <Card.Text>{description}</Card.Text>
            <Row>
              <Col>
                <Card.Link>favoritos</Card.Link>
              </Col>
              <Col>
                <Card.Link as={Link} to="/visits">
                  agenda tu visita
                </Card.Link>
              </Col>
              <Col>
                <Card.Link
                  onClick={() => dispatch(setSelectedProperty(property))}
                  as={Link}
                  to={`/property/${id}`}
                >
                  ver mas
                </Card.Link>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
