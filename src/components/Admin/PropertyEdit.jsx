import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hook/useInput";
import axios from "axios";
import * as settings from "../../settings/index";
import { setSelectedProperty } from "../../state/property";

export const PropertyEdit = () => {
  const property = useSelector((state) => state.selectedProperty);
  const dispatch = useDispatch();
  const [is_for_rentInput, setIsForRentInput] = useState(property.is_for_rent);
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
  const imgsInput = property.imgs.map((img) => useInput(img));
  const categoryInput = useInput(property.categoryId);

  if (!property) {
    return <div>Loading...</div>;
  }

  const handleSaveProperty = async () => {
    try {
      const response = await axios.put(
        `${settings.axiosURL}/admin/property/edit`,
        {
          id: property.id,
          is_for_rent: is_for_rentInput,
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
          imgs: imgsInput.map((imgInput) => imgInput.value),
          categoryId: categoryInput.value,
        }
      );

      const updatedProperty = response.data;
      dispatch(setSelectedProperty(updatedProperty));
      // revisar esta seccion, por que el estado de updatedProperty
      // no cambia el category
      //
      const reloadResponse = await axios.get(
        `${settings.axiosURL}/properties/property/${property.id}`
      );

      const reloadedProperty = reloadResponse.data;

      dispatch(setSelectedProperty(reloadedProperty));
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleIsForRentChange = (e) => {
    setIsForRentInput(e.target.value);
  };

  const handleEditImg = (index, value) => {
    const updatedImgsInput = [...imgsInput];
    updatedImgsInput[index].onChange({ target: { value } });
  };

  const handleRemoveImg = (index) => {
    imgsInput.splice(index, 1);
  };

  const handleAddImg = () => {
    console.log(imgsInput);
  };

  return (
    <div>
      <h3>Propiedad:</h3>
      <div>
        <Form.Group>
          <Form.Label>Tipo:</Form.Label>
          <Form.Control
            as="select"
            value={is_for_rentInput}
            onChange={handleIsForRentChange}
          >
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

          <Form.Label>Imagen frontal:</Form.Label>
          <Form.Control type="text" {...imgInput} />

          <hr className="separator" />
          <Form.Label>Imagenes:</Form.Label>
          {imgsInput.map((imgInput, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                value={imgInput.value}
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
        // as={Link}
        // to={`/admin/property/details/${property.id}`}
      >
        Editar
      </Button>
      <Button as={Link} to={`/admin/property/details/${property.id}`}>
        Volver
      </Button>
    </div>
  );
};
