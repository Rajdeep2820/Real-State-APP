const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- DATABASE ---------------- */

const MONGO_URL = "mongodb://127.0.0.1:27017/realestate";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });

/* ---------------- SCHEMA ---------------- */

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  contact: {
    type: String,
    required: true,
  },

  price: {
    type : Number,
    required : true,
  },

  location: {
    type : String,
    required : true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Property = mongoose.model("Property", propertySchema);

/* ---------------- ROUTES ---------------- */

/* Create Property */
app.post("/api/properties", async (req, res) => {
  try {
    const { title, description, image, contact, price, location } = req.body;

    const newProperty = new Property({
      title,
      description,
      image,
      contact,
      price,
      location
    });

    await newProperty.save();

    res.status(201).json(newProperty);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* Get All Properties */

app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Delete Property */

app.delete("/api/properties/:id", async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      message: "Property deleted",
      deletedProperty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ---------------- SERVER ---------------- */

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});