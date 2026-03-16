import React, { useState } from "react";
import "../App.css";

const ProductList = ({ properties, onDeleteProperty, onContactOwner }) => {

  const [searchLocation, setSearchLocation] = useState("");

  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div>

      {/* Search Bar */}

      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
      </div>

      {/* Property List */}

      <div className="property-list">

        {filteredProperties.length === 0 ? (
          <h3>No properties found</h3>
        ) : (
          filteredProperties.map((property) => (

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

          ))
        )}

      </div>
    </div>
  );
};

export default ProductList;