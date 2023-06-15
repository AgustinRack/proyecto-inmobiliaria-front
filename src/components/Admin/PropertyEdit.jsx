import React, { useState } from "react";
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
  // const imgsInput = useInput(property.imgs);
  const categoryInput = useInput(property.category);

  // Con esto
  const [imgs, setImgs] = useState(property.imgs);

  const handleAddImg = () => {
    setImgs([...imgs, ""]);
  };

  const handleRemoveImg = (index) => {
    const updatedImgs = [...imgs];
    updatedImgs.splice(index, 1);
    setImgs(updatedImgs);
  };

  const handleEditImg = (index, value) => {
    const updatedImgs = [...imgs];
    updatedImgs[index] = value;
    setImgs(updatedImgs);
  };

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
          imgs: imgs,
          category: categoryInput.value,
        }
      );
      const updatedProperty = response.data;
      dispatch(setSelectedProperty(updatedProperty));
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <div>
      <h3>Propiedad:</h3>
      <div>
        <Form.Group>
          <Form.Label>Tipo</Form.Label>
          <Form.Label>Tipo:</Form.Label>
          <Form.Control as="select" {...is_for_rentInput}>
            <option value={false}>En venta</option>
            <option value={true}>En alquiler</option>
          </Form.Control>
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
          <Form.Control type="text" {...imgInput} />

          <hr className="separator" />
          <Form.Label>imgs:</Form.Label>
          {imgs.map((img, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                value={img}
                onChange={(e) => handleEditImg(index, e.target.value)}
              />
              <Button variant="danger" onClick={() => handleRemoveImg(index)}>
                Eliminar
              </Button>
            </div>
          ))}
          <Button variant="success" onClick={handleAddImg}>
            Agregar imagen
          </Button>
          <hr className="separator" />
          <Form.Label>Categoria:</Form.Label>
          <Form.Control as="select" {...categoryInput}>
            <option value={1}>departamento</option>
            <option value={2}>PH</option>
            <option value={3}>casa</option>
            <option value={4}>local</option>
            <option value={5}>terreno</option>
          </Form.Control>
          <hr className="separator" />
        </Form.Group>
      </div>
      <Button
        onClick={handleSaveProperty}
        as={Link}
        to="/admin/property/details/:id"
      >
        Editar
      </Button>
    </div>
  );
};
