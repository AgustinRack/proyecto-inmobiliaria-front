import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import PropertyCard from "./PropertyCard";
import "./propertyStyles/buttonsStyles.css";

export default function PropertyGrid() {
  const properties = useSelector((state) => state.properties);
  const [query, setQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortedProperties, setSortedProperties] = useState([]);
  const [order, setOrder] = useState("Orden");
  const [category, setCategory] = useState("Categorias");
  const [bathrooms, setBathrooms] = useState("Baños");
  const [bedrooms, setBedrooms] = useState("Dormitorios");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setFilteredProperties(properties);
    setSortedProperties(properties);
  }, [properties]);

  const handleSearch = () => {
    let filtered = properties;

    // Filtrar por categoría
    if (category !== "Categorias") {
      filtered = filtered.filter(
        (property) =>
          property.category.categoryName.toLowerCase() ===
          category.toLowerCase()
      );
    }

    // Filtrar por baños
    if (bathrooms !== "Baños") {
      if (bathrooms[0] === "3") {
        filtered = filtered.filter((property) => property.bathrooms >= 3);
      } else {
        filtered = filtered.filter(
          (property) => property.bathrooms.toString() === bathrooms[0]
        );
      }
    }

    // Filtrar por dormitorios
    if (bedrooms !== "Dormitorios") {
      if (bedrooms[0] === "3") {
        filtered = filtered.filter((property) => property.bedrooms >= 3);
      } else {
        filtered = filtered.filter(
          (property) => property.bedrooms.toString() === bedrooms[0]
        );
      }
    }

    // Filtrar por provincia
    if (query.trim() !== "") {
      filtered = filtered.filter((property) =>
        property.province.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filtrar por precio mínimo
    if (minPrice !== "") {
      filtered = filtered.filter(
        (property) => property.price >= parseFloat(minPrice)
      );
    }

    // Filtrar por precio máximo
    if (maxPrice !== "") {
      filtered = filtered.filter(
        (property) => property.price <= parseFloat(maxPrice)
      );
    }

    setFilteredProperties(filtered);
    setSortedProperties(filtered);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
  };

  const handleBathroomsChange = (bathroomCount) => {
    setBathrooms(bathroomCount);
  };

  const handleBedroomsChange = (bedroomCount) => {
    setBedrooms(bedroomCount);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handlePriceOrderChange = (priceOrder) => {
    let sorted = [...filteredProperties]; // Hacer una copia del array

    if (priceOrder !== "Orden") {
      sorted.sort((a, b) => {
        if (priceOrder === "Mayor a Menor") {
          return b.price - a.price;
        } else {
          return a.price - b.price;
        }
      });
    }
    setOrder(priceOrder);
    setSortedProperties(sorted);
  };

  return (
    <Container>
      <Row>
        <Col xs={8}>
          <Form.Control
            value={query}
            onChange={handleInputChange}
            placeholder="Search by province"
          />
        </Col>
        <Col xs={4}>
          <Button variant="outline-success" onClick={handleSearch} block>
            Search
          </Button>
        </Col>
        <Col xs={12} className="d-flex buttons-container">
          <DropdownButton id="category-dropdown" title={category}>
            <Dropdown.Item onClick={() => handleCategoryChange("Categorias")}>
              Categorias
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("departamento")}>
              Departamento
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("PH")}>
              PH
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("casa")}>
              Casa
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("terreno")}>
              Terreno
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategoryChange("local")}>
              Local
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="bathroom-dropdown" title={bathrooms}>
            <Dropdown.Item onClick={() => handleBathroomsChange("Baños")}>
              Baños
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleBathroomsChange("1 Baño")}>
              1 Baño
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleBathroomsChange("2 Baños")}>
              2 Baños
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleBathroomsChange("3 o más Baños ")}
            >
              3 o más Baños
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="bedroom-dropdown" title={bedrooms}>
            <Dropdown.Item onClick={() => handleBedroomsChange("Dormitorios")}>
              Dormitorios
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleBedroomsChange("1 Dormitorio")}>
              1 Dormitorio
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleBedroomsChange("2 Dormitorios")}
            >
              2 Dormitorios
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleBedroomsChange("3 o más Dormitorios")}
            >
              3 o más Dormitorios
            </Dropdown.Item>
          </DropdownButton>
          <Form.Group>
            <Form.Control
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="Precio mínimo"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="Precio máximo"
            />
          </Form.Group>
          <DropdownButton id="price-order-dropdown" title={order}>
            <Dropdown.Item onClick={() => handlePriceOrderChange("Orden")}>
              Orden
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handlePriceOrderChange("Mayor a Menor")}
            >
              Mayor a Menor
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handlePriceOrderChange("Menor a Mayor")}
            >
              Menor a Mayor
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        {sortedProperties.map((property) => (
          <Col xs={6} key={property.id} style={{ marginBottom: "20px" }}>
            <PropertyCard property={property} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   Button,
//   Container,
//   Dropdown,
//   DropdownButton,
//   Form,
//   Row,
//   Col,
// } from "react-bootstrap";
// import PropertyCard from "./PropertyCard";

// export default function PropertyGrid() {
//   const properties = useSelector((state) => state.properties);
//   const [query, setQuery] = useState("");
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [sortedProperties, setSortedProperties] = useState([]);
//   const [order, setOrder] = useState("Orden");
//   const [category, setCategory] = useState("Categorias");
//   const [bathrooms, setBathrooms] = useState("Baños");
//   const [bedrooms, setBedrooms] = useState("Dormitorios");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   useEffect(() => {
//     setFilteredProperties(properties);
//     setSortedProperties(properties);
//   }, [properties]);

//   const handleSearch = () => {
//     let filtered = properties;

//     // Filtrar por categoría
//     if (category !== "Categorias") {
//       filtered = filtered.filter(
//         (property) =>
//           property.category.categoryName.toLowerCase() ===
//           category.toLowerCase()
//       );
//     }

//     // Filtrar por baños
//     if (bathrooms !== "Baños") {
//       if (bathrooms === "3 o más Baños") {
//         filtered = filtered.filter((property) => property.bathrooms >= 3);
//       } else {
//         filtered = filtered.filter(
//           (property) => property.bathrooms.toString() === bathrooms
//         );
//       }
//     }

//     // Filtrar por dormitorios
//     if (bedrooms !== "Dormitorios") {
//       if (bedrooms === "3 o más Dormitorios") {
//         filtered = filtered.filter((property) => property.bedrooms >= 3);
//       } else {
//         filtered = filtered.filter(
//           (property) => property.bedrooms.toString() === bedrooms
//         );
//       }
//     }

//     // Filtrar por provincia
//     if (query.trim() !== "") {
//       filtered = filtered.filter((property) =>
//         property.province.toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     // Filtrar por precio mínimo
//     if (minPrice !== "") {
//       filtered = filtered.filter(
//         (property) => property.price >= parseFloat(minPrice)
//       );
//     }

//     // Filtrar por precio máximo
//     if (maxPrice !== "") {
//       filtered = filtered.filter(
//         (property) => property.price <= parseFloat(maxPrice)
//       );
//     }

//     setFilteredProperties(filtered);
//     setSortedProperties(filtered);
//   };

//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleCategoryChange = (categoryName) => {
//     setCategory(categoryName);
//   };

//   const handleBathroomsChange = (bathroomCount) => {
//     setBathrooms(bathroomCount);
//   };

//   const handleBedroomsChange = (bedroomCount) => {
//     setBedrooms(bedroomCount);
//   };

//   const handleMinPriceChange = (event) => {
//     setMinPrice(event.target.value);
//   };

//   const handleMaxPriceChange = (event) => {
//     setMaxPrice(event.target.value);
//   };

//   const handlePriceOrderChange = (priceOrder) => {
//     let sorted = [...filteredProperties]; // Hacer una copia del array

//     if (priceOrder !== "Orden") {
//       sorted.sort((a, b) => {
//         if (priceOrder === "Mayor a Menor") {
//           return b.price - a.price;
//         } else {
//           return a.price - b.price;
//         }
//       });
//     }
//     setOrder(priceOrder);
//     setSortedProperties(sorted);
//   };

//   return (
//     <Container>
//       <Row>
//         <Col xs={8}>
//           <Form.Control
//             value={query}
//             onChange={handleInputChange}
//             placeholder="Search by province"
//           />
//         </Col>
//         <Col xs={4}>
//           <Button variant="outline-success" onClick={handleSearch} block>
//             Search
//           </Button>
//         </Col>
//         <Col xs={12}>
//           <DropdownButton id="category-dropdown" title={category}>
//             <Dropdown.Item onClick={() => handleCategoryChange("Categorias")}>
//               Categorias
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => handleCategoryChange("departamento")}>
//               Departamento
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => handleCategoryChange("PH")}>
//               PH
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => handleCategoryChange("casa")}>
//               Casa
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => handleCategoryChange("terreno")}>
//               Terreno
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => handleCategoryChange("local")}>
//               Local
//             </Dropdown.Item>
//           </DropdownButton>
//           <DropdownButton id="bathroom-dropdown" title={bathrooms}>
//             <Dropdown.Item onClick={() => handleBathroomsChange("Baños")}>
//               Baños
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => handleBathroomsChange("1 Baño")}>
//               1 Baño
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => handleBathroomsChange("2 Baños")}>
//               2 Baños
//             </Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => handleBathroomsChange("3 o más Baños ")}
//             >
//               3 o más Baños
//             </Dropdown.Item>
//           </DropdownButton>
//           <DropdownButton id="bedroom-dropdown" title={bedrooms}>
//             <Dropdown.Item onClick={() => handleBedroomsChange("Dormitorios")}>
//               Dormitorios
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => handleBedroomsChange("1 Dormitorio")}>
//               1 Dormitorio
//             </Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => handleBedroomsChange("2 Dormitorios")}
//             >
//               2 Dormitorios
//             </Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => handleBedroomsChange("3 o más Dormitorios")}
//             >
//               3 o más Dormitorios
//             </Dropdown.Item>
//           </DropdownButton>
//           <Form.Group>
//             <Form.Control
//               type="number"
//               value={minPrice}
//               onChange={handleMinPriceChange}
//               placeholder="Precio mínimo"
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Control
//               type="number"
//               value={maxPrice}
//               onChange={handleMaxPriceChange}
//               placeholder="Precio máximo"
//             />
//           </Form.Group>
//           <DropdownButton id="price-order-dropdown" title={order}>
//             <Dropdown.Item onClick={() => handlePriceOrderChange("Orden")}>
//               Orden
//             </Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => handlePriceOrderChange("Mayor a Menor")}
//             >
//               Mayor a Menor
//             </Dropdown.Item>
//             <Dropdown.Item
//               onClick={() => handlePriceOrderChange("Menor a Mayor")}
//             >
//               Menor a Mayor
//             </Dropdown.Item>
//           </DropdownButton>
//         </Col>
//       </Row>
//       <Row>
//         {sortedProperties.map((property) => (
//           <Col xs={6} key={property.id} style={{ marginBottom: "20px" }}>
//             <PropertyCard property={property} />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }
