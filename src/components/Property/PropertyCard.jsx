import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProperty } from "../../state/property";
import { Link, useNavigate } from "react-router-dom";
// import "../../css/propertyCard.css";
import "../../css/styles.css";
import { ListGroupItem } from "react-bootstrap";
import * as settings from "../../settings/index";
import axios from "axios";
import { setFavorites } from "../../state/favorites";

export default function PropertyCard({ property }) {
  const admin = useSelector((state) => state.user.admin);
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  async function fetchFavorite() {
    try {
      const response = await axios.post(
        `${settings.axiosURL}/favorites/new-favorite`,
        {
          user_id: user.id,
          properties_id: property.id,
        }
      );

      const favorites = await axios.get(
        `${settings.axiosURL}/favorites/all/${user.id}`
      );
      const favoritesProperties = favorites.data.map(
        (favorite) => favorite.property
      );

      dispatch(setFavorites(favoritesProperties));
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const handleFavorite = async () => {
    try {
      if (user) {
        const createFavorites = await fetchFavorite();
        alert(createFavorites.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="Card">
      <Row>
        <Col xs={12} md={4}>
          <Card.Img className="card-images" variant="top" src={img} />
        </Col>
        <Col xs={12} md={8}>
          <Card.Body>
            <Row>
              <Col xs={12} md={4} className="price">
                <ListGroup.Item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  $ {price}
                </ListGroup.Item>
              </Col>
              <Col xs={12} md={8} className="price">
                <ListGroup.Item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {province}
                </ListGroup.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4} className="price">
                <ListGroup.Item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {size} m²
                </ListGroup.Item>
              </Col>
              <Col xs={6} md={4} className="price">
                {category.categoryName !== "terreno" ? (
                  <>
                    {bathrooms === 1 ? (
                      <ListGroup.Item
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {bathrooms} baño
                      </ListGroup.Item>
                    ) : (
                      <ListGroup.Item
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {bathrooms} baños
                      </ListGroup.Item>
                    )}
                  </>
                ) : (
                  <ListGroup.Item
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ------
                  </ListGroup.Item>
                )}
              </Col>
              <Col xs={6} md={4} className="price">
                {category.categoryName !== "terreno" ? (
                  <ListGroup.Item
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {bedrooms} dorm.
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ------
                  </ListGroup.Item>
                )}
              </Col>
            </Row>
            <Row>
              <ListGroupItem
                className="price-description"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {description}
              </ListGroupItem>
            </Row>
            <Row>
              {admin ? (
                <Col>
                  <Link
                    to={`/admin/property/details/${id}`}
                    className="custom-button-admin"
                    onClick={() => dispatch(setSelectedProperty(property))}
                  >
                    <img
                      className="button-icon-admin"
                      src="https://cdn.discordapp.com/attachments/1087732828525056031/1116793302184898663/image.png"
                      alt="Custom Button"
                    />
                  </Link>
                </Col>
              ) : (
                <>
                  <Col>
                    <button
                      className="heart-button"
                      onClick={() => handleFavorite()}
                    >
                      <span className="heart-icon"></span>
                    </button>
                  </Col>
                  <Col>
                    <Link
                      to="/visits/appointment"
                      onClick={() => dispatch(setSelectedProperty(property))}
                    >
                      <button className="phone-button">
                        <span className="call-icon"></span>
                      </button>
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      to={`/property/${id}`}
                      className="custom-button-user"
                      onClick={() => dispatch(setSelectedProperty(property))}
                    >
                      <img
                        className="button-icon-user"
                        src="https://cdn.discordapp.com/attachments/1087732828525056031/1116793302184898663/image.png"
                        alt="Custom Button"
                      />
                    </Link>
                  </Col>
                </>
              )}
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
