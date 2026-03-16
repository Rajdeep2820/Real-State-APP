import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {

  const { id } = useParams();

  const [property, setProperty] = useState(null);

  useEffect(() => {

    axios
      .get(`http://localhost:8080/api/properties`)
      .then((res) => {

        const selectedProperty = res.data.find((p) => p._id === id);

        setProperty(selectedProperty);

      });

  }, [id]);

  if (!property) return <h2>Loading...</h2>;

  return (

    <div className="details-container">

      <img
        src={property.image}
        alt={property.title}
        style={{ width: "400px", borderRadius: "10px" }}
      />

      <h2>{property.title}</h2>

      <p>{property.description}</p>

      <p><strong>Location:</strong> {property.location}</p>

      <p><strong>Price:</strong> ₹{property.price}</p>

      <p><strong>Contact:</strong> {property.contact}</p>

    </div>

  );
};

export default PropertyDetails;