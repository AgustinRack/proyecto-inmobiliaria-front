import React from "react";
import { useSelector } from "react-redux";

export const PropertyDetail = () => {
  const property = useSelector((state) => state.selectedProperty);

  if (!property) {
    return <div>Loading...</div>;
  }

  const { description, imgs } = property;

  return (
    <div>
      <h2>Description:</h2>
      <p style={{ fontSize: "1.6em" }}>{description}</p>
      <h2>Images:</h2>
      <div>
        {imgs.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Image ${index}`}
            style={{ width: "500px", height: "auto", margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
};
