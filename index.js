const express = require("express");
const conectarDB = require("./config/db");

// Crear servidor
const app = express();

// Conectar db
conectarDB();

// Habilitar expressJSON
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 8080;

// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));

// arrancar la app
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
