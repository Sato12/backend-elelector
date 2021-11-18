const express = require("express");
const conectarDB = require("./config/db");

// Crear servidor
const app = express();

// Conectar db
conectarDB();

// puerto de la app
const PORT = process.env.PORT || 8080;

// arrancar la app
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
