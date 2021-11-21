const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { response } = require("express");

exports.autenticarUsuario = async (req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // extraer email y password

  const { email, password } = req.body;

  try {
    // Revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: "el usuario no existe" });
    }

    // Revisar password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password Incorrecto" });
    }

    // Si se pasa jwt

    // Crear y firmar JWT
    const payload = {
      usuario: usuario.id,
    };

    // Firmar jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 14400,
      },
      (error, token) => {
        if (error) throw error;

        // Mensaje de confirmación
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Obtener usuario autenticado

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario).select("-password");
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error al autenticar usuario" });
  }
};
