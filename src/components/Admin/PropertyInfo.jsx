import React from "react";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PropertyInfo = () => {
  const property = useSelector((state) => state.selectedProperty);

  if (!property) {
    return <div>Loading...</div>;
  }

  const {
    id,
    is_for_rent,
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
    <div>
      <h3>Propiedad:</h3>
      <div>
        <Form.Group>
          <Form.Label>Tipo</Form.Label>
          {is_for_rent ? (
            <p>Propiedad en alquiler</p>
          ) : (
            <p>Propiedad en venta</p>
          )}
          <hr className="separator" />
          <Form.Label>Price:</Form.Label>
          <p>$ {price}</p>
          <hr className="separator" />
          <Form.Label>Country:</Form.Label>
          <p>{country}</p>
          <hr className="separator" />
          <Form.Label>Province:</Form.Label>
          <p>{province}</p>
          <hr className="separator" />
          <Form.Label>Neighborhood:</Form.Label>
          <p>{neighborhood}</p>
          <hr className="separator" />
          <Form.Label>Address:</Form.Label>
          <p>{address}</p>
          <hr className="separator" />
          <Form.Label>Size:</Form.Label>
          <p>{size} m²</p>
          <hr className="separator" />
          <Form.Label>Bedrooms:</Form.Label>
          <p>{bedrooms}</p>
          <hr className="separator" />
          <Form.Label>Bathrooms:</Form.Label>
          <p>{bathrooms}</p>
          <hr className="separator" />
          <Form.Label>Description:</Form.Label>
          <p>{description}</p>
          <hr className="separator" />
          <Form.Label>img:</Form.Label>
          <p>
            <a href={img} target="_blank" rel="noopener noreferrer">
              {img}
            </a>
          </p>
          <hr className="separator" />
          <Form.Label>imgs:</Form.Label>
          {imgs.map((img, index) => (
            <p key={index}>
              <a href={img} target="_blank" rel="noopener noreferrer">
                {img}
              </a>
            </p>
          ))}
          <hr className="separator" />
          <Form.Label>Categoria:</Form.Label>
          <p>{category.categoryName}</p>
          <hr className="separator" />
        </Form.Group>
      </div>
      <Button as={Link} to={`/admin/property/edit`}>
        Editar
      </Button>
    </div>
  );
};
