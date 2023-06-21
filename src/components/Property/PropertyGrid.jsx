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

export default function PropertyGrid() {
  const properties = useSelector((state) => state.properties);
  const [query, setQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [category, setCategory] = useState("Categoria");

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const handleSearch = () => {
    let filtered = properties;

    if (category !== "Categoria") {
      filtered = filtered.filter(
        (property) =>
          property.category.categoryName.toLowerCase() ===
          category.toLowerCase()
      );
    }

    if (query.trim() !== "") {
      filtered = filtered.filter((property) =>
        property.province.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
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
        <Col xs={12}>
          <DropdownButton id="category-dropdown" title={category}>
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
        </Col>
      </Row>
      <Row>
        {filteredProperties.map((property) => (
          <Col key={property.id}>
            <PropertyCard property={property} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// import React, { useEffect, useState } from "react";
// import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { useSelector } from "react-redux";
// import PropertyCard from "./PropertyCard";
// import {
//   Button,
//   Container,
//   Dropdown,
//   DropdownButton,
//   Form,
// } from "react-bootstrap";
// import SearchBar from "../../common/SearchBar";

// export default function PropertyGrid() {
//   const properties = useSelector((state) => state.properties);
//   const [query, setQuery] = useState("");
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [category, setCategory] = useState("Categoria");

//   useEffect(() => {
//     setFilteredProperties(properties);
//   }, [properties]);

//   const handleSearch = () => {
//     const filtered = properties.filter(
//       (property) => property.province.toLowerCase() === query.toLowerCase()
//     );
//     setFilteredProperties(filtered);
//     if (!query) setFilteredProperties(properties);
//   };

//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleCategoryChange = (categoryName) => {
//     setCategory(categoryName);
//     setFilteredProperties(properties);
//     console.log(properties);
//     console.log(filteredProperties);
//     setFilteredProperties(
//       filteredProperties.filter(
//         (property) => property.category.categoryName == categoryName
//       )
//     );
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
//         </Col>
//       </Row>
//       <Row>
//         {filteredProperties.map((property) => (
//           <Col key={property.id}>
//             <PropertyCard property={property} />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }
