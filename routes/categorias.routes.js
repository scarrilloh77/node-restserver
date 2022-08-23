const { Router, request, response } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias.controllers");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - público
router.get("/", obtenerCategorias);

// Obtener una categoria por id - público
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatory").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar categoria - privado - cualquier persona con un token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar una categoría - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
