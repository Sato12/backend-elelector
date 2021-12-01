const express = require("express");
const router = express.Router();
const candidatoController = require("../controllers/candidatoController");
const auth = require("../middleware/auth");
const authGet = require("../middleware/authGet");
const cors = require("../middleware/cors");
const { check } = require("express-validator");

router.post(
  "/",
  auth,
  [
    check("nombre", "Falta el nombre corto").not().isEmpty(),
    check("fullNombre", "Falta el nombre completo").not().isEmpty(),
    check("descripcionBreve", "Falta descripcionBreve").not().isEmpty(),
    check("partido", "Falta el partido").not().isEmpty(),
    check("genero", "Falta el genero").not().isEmpty(),
    check("cargos", "Faltan los cargos").not().isEmpty(),
    check("formacion", "Falta la formacion").not().isEmpty(),
    check("logo", "Falta el logo").not().isEmpty(),
    check("profesion", "Falta profesion").not().isEmpty(),
    check("foto", "Falta foto").not().isEmpty(),
    check("sigep", "Falta el sigep").not().isEmpty(),
  ],
  candidatoController.crearCandidato
);

// Obtener candidatos
router.get("/", authGet, cors, candidatoController.obtenerCandidatosUser);

// Actualizar candidato via ID

router.put(
  "/:id",
  auth,
  [
    check("nombre", "Falta el nombre corto").not().isEmpty(),
    check("fullNombre", "Falta el nombre completo").not().isEmpty(),
    check("descripcionBreve", "Falta descripcionBreve").not().isEmpty(),
    check("partido", "Falta el partido").not().isEmpty(),
    check("genero", "Falta el genero").not().isEmpty(),
    check("cargos", "Faltan los cargos").not().isEmpty(),
    check("formacion", "Falta la formacion").not().isEmpty(),
    check("logo", "Falta el logo").not().isEmpty(),
    check("profesion", "Falta profesion").not().isEmpty(),
    check("foto", "Falta foto").not().isEmpty(),
    check("sigep", "Falta el sigep").not().isEmpty(),
  ],
  candidatoController.actualizarCandidato
);

// Eliminar un candidato

router.delete("/:id", auth, candidatoController.eliminarCandidato);

module.exports = router;
