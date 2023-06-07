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
      <p>{description}</p>
      <h2>Images:</h2>
      <div>
        {imgs.map((img, index) => (
          <img key={index} src={img} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
};
