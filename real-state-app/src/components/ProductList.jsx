import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const ProductList = ({ properties, onDeleteProperty, onContactOwner }) => {

  const [searchLocation, setSearchLocation] = useState("");

  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </div>

      <div className="property-list">

        {filteredProperties.map((property) => (

          <Link
            to={`/property/${property._id}`}
            key={property._id}
            style={{ textDecoration: "none", color: "black" }}
          >

            <div className="property-card">

              <img  src={`http://localhost:8080${property.image}`}
  alt={property.title}/>

              <h3>{property.title}</h3>

              <p>{property.description}</p>

              <p><strong>Location:</strong> {property.location}</p>

              <p><strong>Price:</strong> ₹{property.price}</p>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
};

export default ProductList;