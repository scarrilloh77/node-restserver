const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { validationResult } = require("express-validator");

const usuariosGet = (req = request, res = response) => {
  // const query = req.query;
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get API - controlador",
    // query,
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo: correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "Ese correo ya está registrado",
    });
  }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json({
    msg: "post API - controlador",
    usuario,
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API - controlador",
    id,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
