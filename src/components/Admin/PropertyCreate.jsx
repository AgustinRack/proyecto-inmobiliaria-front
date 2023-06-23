import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import useInput from "../../hook/useInput";
import axios from "axios";
import * as settings from "../../settings/index";
import { useNavigate } from "react-router-dom";

export default function CreateProperty() {
  const navigate = useNavigate();
  const [is_for_rentInput, setIsForRentInput] = useState(false);
  const priceInput = useInput();
  const countryInput = useInput();
  const provinceInput = useInput();
  const neighborhoodInput = useInput();
  const addressInput = useInput();
  const sizeInput = useInput();
  const bedroomsInput = useInput();
  const bathroomsInput = useInput();
  const descriptionInput = useInput();
  const imgInput = useInput();
  const categoryInput = useInput(1);
  const [imgsInput, setImgsInput] = useState([""]);

  const handleCreateProperty = async () => {
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
        alert("Complete todos los campos para crear una propiedad");
      } else {
        await axios.post(`${settings.axiosURL}/admin/new-property`, {
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
        });

        alert("Propiedad creada correctamente");
        navigate("/");
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

  return (
    <div>
      <h3>Nueva Propiedad:</h3>
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
      <Button onClick={handleCreateProperty}>Crear</Button>
    </div>
  );
}
