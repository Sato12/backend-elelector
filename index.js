const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Crear servidor
const app = express();

// Conectar db
conectarDB();

//Habilitar CORS
app.use(cors());
//

// Habilitar expressJSON
app.use(express.json({ extended: true, limit: "4000kb" }));

// puerto de la app
const port = process.env.port || 8080;

const options = {
  target: "https://elector-servidor.herokuapp.com/", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
};

const exampleProxy = createProxyMiddleware(options);

// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/candidatos", exampleProxy, require("./routes/candidatos"));
app.use("/api/contacto", require("./routes/contacto"));

// arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
