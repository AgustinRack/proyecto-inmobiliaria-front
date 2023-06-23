import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export const PropertyDetail = () => {
  const property = useSelector((state) => state.selectedProperty);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) {
    return <div>Loading...</div>;
  }

  const {
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

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgs.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imgs.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src={imgs[currentImageIndex]}
              alt={`Image ${currentImageIndex}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {imgs.length > 1 && (
              <div style={{ display: "flex", marginTop: "10px" }}>
                <Button
                  variant="primary"
                  onClick={handlePreviousImage}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <BsFillArrowLeftCircleFill />
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNextImage}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                >
                  <BsFillArrowRightCircleFill />
                </Button>
              </div>
            )}
          </div>
        </Col>
        <Col md={6}>
          <div style={{ padding: "20px" }}>
            <h2>Description:</h2>
            <p style={{ fontSize: "1.6em" }}>{description}</p>
            <div>
              <p>País: {country}</p>
              <p>Provincia: {province}</p>
              <p>Barrio: {neighborhood}</p>
              <p>Direccion: {address}</p>
              <p>Tipo: {category.categoryName}</p>
              <p>Tamaño: {size}m²</p>
              <div style={{ display: "flex" }}>
                <p>Dormitorios: {bedrooms}</p>
                <p style={{ marginLeft: "20px" }}>Baños: {bathrooms}</p>
              </div>
              <h4>Precio: $ {price}</h4>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
