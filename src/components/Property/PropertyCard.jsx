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
    province,
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
                <ListGroup.Item>{province}</ListGroup.Item>
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
                <button className="heart-button">
                  <span className="heart-icon"></span>
                </button>
              </Col>
              <Col>
                <button className="phone-button">
                  <span className="call-icon"></span>
                </button>
              </Col>
              <Col>
                <Link
                  to={`/property/${id}`}
                  className="custom-button"
                  onClick={() => dispatch(setSelectedProperty(property))}
                >
                  <img
                    className="button-icon"
                    src="https://cdn.discordapp.com/attachments/1087732828525056031/1116793302184898663/image.png"
                    alt="Custom Button"
                  />
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
