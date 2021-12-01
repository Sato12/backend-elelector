const express = require("express");
const router = express.Router();
const contactoController = require("../controllers/contactoController");

// Crear un usuario

// api/contacto
router.post("/", contactoController.main);

module.exports = router;
