import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProperty from "./components/AddProperty";
import ProductList from "./components/ProductList";
import PropertyDetails from "./components/PropertyDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/properties")
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddProperty = (newProperty) => {
    setProperties((prev) => [...prev, newProperty]);
  };

  const handleContactOwner = (contact) => {
    alert(`Contact Owner: ${contact}`);
  };

  const handleDeleteProperty = async (id) => {

    try {
      await axios.delete(`http://localhost:8080/api/properties/${id}`);

      setProperties((prev) =>
        prev.filter((property) => property._id !== id)
      );

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <Router>

      <div className="container">

        <h1 className="gfg">Real Estate App</h1>

        <Routes>

          <Route
            path="/"
            element={
              <>
                <AddProperty onAddProperty={handleAddProperty} />

                <ProductList
                  properties={properties}
                  onDeleteProperty={handleDeleteProperty}
                  onContactOwner={handleContactOwner}
                />
              </>
            }
          />

          <Route
            path="/property/:id"
            element={<PropertyDetails />}
          />

        </Routes>

      </div>

    </Router>
  );
};

export default App;