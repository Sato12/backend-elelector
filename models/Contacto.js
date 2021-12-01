const mongoose = require("mongoose");

const ContactoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Contacto", ContactoSchema);
