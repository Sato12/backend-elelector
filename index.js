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
const PORT = process.env.PORT || 8080;

// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/candidatos", require("./routes/candidatos"));

// arrancar la app
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
