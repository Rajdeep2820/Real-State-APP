import React, { useState } from "react";
import axios from "axios";

const AddProperty = ({ onAddProperty }) => {

  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    image: "",
    contact: "",
    price: "",
    location: ""
  });

  const handleChange = (e) => {
    setNewProperty({
      ...newProperty,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/api/properties",
        newProperty
      );

      onAddProperty(response.data);

      setNewProperty({
        title: "",
        description: "",
        image: "",
        contact: "",
        price: "",
        location: ""
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">

      <h2>Add Property</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-row">
          <label>Title</label>
          <input name="title" value={newProperty.title} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Description</label>
          <input name="description" value={newProperty.description} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Image URL</label>
          <input name="image" value={newProperty.image} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Contact</label>
          <input name="contact" value={newProperty.contact} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Price</label>
          <input type="number" name="price" value={newProperty.price} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Location</label>
          <input name="location" value={newProperty.location} onChange={handleChange} required />
        </div>

        <button type="submit">Add Property</button>

      </form>

    </div>
  );
};

export default AddProperty;