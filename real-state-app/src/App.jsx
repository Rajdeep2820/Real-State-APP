import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProperty from "./components/AddProperty";
import ProductList from "./components/ProductList";
import "./App.css";

const App = () => {
  const [properties, setProperties] = useState([]);

  // Fetch properties when app loads
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  // Add property to state
  const handleAddProperty = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
  };

  // Contact owner
  const handleContactOwner = (contact) => {
    alert(`Contact the owner at: ${contact}`);
  };

  // Delete property
  const handleDeleteProperty = async (propertyId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/properties/${propertyId}`
      );

      setProperties((prevProperties) =>
        prevProperties.filter(
          (property) => property._id !== propertyId
        )
      );
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="gfg">GFG</h1>
      <h1>Real Estate Management</h1>

      <AddProperty onAddProperty={handleAddProperty} />

      <ProductList
        properties={properties}
        onDeleteProperty={handleDeleteProperty}
        onContactOwner={handleContactOwner}
      />
    </div>
  );
};

export default App;