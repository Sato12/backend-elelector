const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// Crear servidor
const app = express();

// Conectar db
conectarDB();

//Habilitar CORS
app.use(cors());
// Habilitar expressJSON
app.use(express.json({ extended: true, limit: "4000kb" }));

// puerto de la app
const port = process.env.port || 8080;

// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/candidatos", require("./routes/candidatos"));
app.use("/api/contacto", require("./routes/contacto"));

// arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
