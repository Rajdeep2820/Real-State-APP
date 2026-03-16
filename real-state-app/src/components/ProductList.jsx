import React from "react";
import "../App.css";

const ProductList = ({ properties, onDeleteProperty, onContactOwner }) => {
  return (

    <div className="property-list">

      {properties.map((property) => (

        <div key={property._id} className="property-card">

          <img src={property.image} alt={property.title} />

          <h3>{property.title}</h3>

          <p>{property.description}</p>

          <p><strong>Location:</strong> {property.location}</p>

          <p><strong>Price:</strong> ₹{property.price}</p>

          <button
            onClick={() => onContactOwner(property.contact)}
          >
            Contact Owner
          </button>

          <button
            className="delete-btn"
            onClick={() => onDeleteProperty(property._id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );
};

export default ProductList;