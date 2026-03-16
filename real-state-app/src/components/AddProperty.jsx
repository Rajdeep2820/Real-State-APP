import React, { useState } from "react";
import axios from "axios";

const AddProperty = ({ onAddProperty }) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contact: "",
    price: "",
    location: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("contact", formData.contact);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("image", image);

    try {

      const response = await axios.post(
        "http://localhost:8080/api/properties",
        data
      );

      onAddProperty(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="form-container">

      <h2>Add Property</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <input
          name="contact"
          placeholder="Contact"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit">Add Property</button>

      </form>

    </div>

  );
};

export default AddProperty;