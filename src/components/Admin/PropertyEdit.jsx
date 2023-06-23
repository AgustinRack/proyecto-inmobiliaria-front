import React, { useEffect, useState } from "react";
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
  const categoryInput = useInput(property.categoryId);
  const [imgsInput, setImgsInput] = useState(property.imgs);

  if (!property) {
    return <div>Loading...</div>;
  }

  const handleSaveProperty = async () => {
    try {
      if (
        !priceInput.value ||
        !countryInput.value ||
        !provinceInput.value ||
        !neighborhoodInput.value ||
        !addressInput.value ||
        !sizeInput.value ||
        !bedroomsInput.value ||
        !bathroomsInput.value ||
        !descriptionInput.value ||
        !imgInput.value ||
        !imgsInput.every((img) => Boolean(img.trim())) ||
        !categoryInput.value
      ) {
        alert("Complete todos los campos para editar una propiedad");
      } else {
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
            imgs: imgsInput,
            categoryId: categoryInput.value,
          }
        );

        const updatedProperty = response.data;

        dispatch(setSelectedProperty(updatedProperty));
        alert("Propiedad editada correctamente");
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleIsForRentChange = (e) => {
    setIsForRentInput(e.target.value);
  };

  const handleAddImage = () => {
    setImgsInput([...imgsInput, ""]);
  };

  const handleRemoveImage = (index) => {
    const updatedImgsInput = [...imgsInput];
    updatedImgsInput.splice(index, 1);
    setImgsInput(updatedImgsInput);
  };

  const handleImageChange = (index, e) => {
    const updatedImgsInput = [...imgsInput];
    updatedImgsInput[index] = e.target.value;
    setImgsInput(updatedImgsInput);
  };

  const handleDeleteProperty = async (req, res) => {
    try {
      await axios.delete(`${settings.axiosURL}/admin/property/${property.id}`);
      alert("Propiedad elimina exitosamente");
    } catch (error) {}
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
          {imgsInput.map((img, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                value={img}
                onChange={(e) => handleImageChange(index, e)}
              />
              <Button variant="danger" onClick={() => handleRemoveImage(index)}>
                Eliminar
              </Button>
            </div>
          ))}
          <Button variant="success" onClick={handleAddImage}>
            Agregar Imagen
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
      <div className="d-flex justify-content-between">
        <div>
          <Button onClick={handleSaveProperty}>Editar</Button>
          <Button as={Link} to={`/admin/property/details/${property.id}`}>
            Volver
          </Button>
        </div>
        <div>
          <Button
            variant="danger"
            onClick={handleDeleteProperty}
            as={Link}
            to={"/"}
          >
            Eliminar Propiedad
          </Button>
        </div>
      </div>
    </div>
  );
};
