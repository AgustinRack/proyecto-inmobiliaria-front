import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hook/useInput";
import axios from "axios";
import * as settings from "../../settings/index";

export const PropertyEdit = () => {
  const property = useSelector((state) => state.selectedProperty);
  const is_for_rentInput = useInput(property.is_for_rent);
  const priceInput = useInput(property.price);
  const countryInput = useInput(property.country);
  const provinceInput = useInput(property.province);
  const neighborhoodInput = useInput(property.neighborhood);
  const addressInput = useInput(property.address);
  const sizeInput = useInput(property.size);
  const bedroomsInput = useInput(property.bedrooms);
  const bathroomsInput = useInput(property.bathrooms);
  const descriptionInput = useInput(property.description);
  const imgInput = useInput(property.img);
  const imgsInput = useInput(property.imgs);
  const categoryInput = useInput(property.category);

  if (!property) {
    return <div>Loading...</div>;
  }

  const handleSaveProperty = async () => {
    try {
      const response = await axios.put(
        `${settings.axiosURL}/admin/property/edit`,
        {
          id: property.id,
          is_for_rent: is_for_rentInput.value,
          price: priceInput.value,
          country: countryInput.value,
          province: provinceInput.value,
          neighborhood: neighborhoodInput.value,
          address: addressInput.value,
          size: sizeInput.value,
          bedrooms: bedroomsInput.value,
          bathrooms: bathroomsInput.value,
          description: descriptionInput.value,
          img: imgInput.value,
          imgs: imgsInput.value,
          category: categoryInput.value,
        }
      );
      const updatedUser = response.data;
      dispatch(loginSuccess(updatedUser));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

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
          <Form.Control type="text" {...priceInput} />

          <Form.Label>Country:</Form.Label>
          <Form.Control type="text" {...countryInput} />

          <Form.Label>Province:</Form.Label>
          <Form.Control type="text" {...provinceInput} />

          <Form.Label>Neighborhood:</Form.Label>
          <Form.Control type="text" {...neighborhoodInput} />

          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" {...addressInput} />

          <Form.Label>Size:</Form.Label>
          <Form.Control type="text" {...sizeInput} />

          <Form.Label>Bedrooms:</Form.Label>
          <Form.Control type="text" {...bedroomsInput} />

          <Form.Label>Bathrooms:</Form.Label>
          <Form.Control type="text" {...bathroomsInput} />

          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" {...descriptionInput} />

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
      <Button onClick={handleSaveProperty} as={Link} to="/user/profile">
        Editar
      </Button>
    </div>
  );
};
