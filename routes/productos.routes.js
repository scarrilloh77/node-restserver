const { Router, request, response } = require('express');
const { check } = require('express-validator');
const {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
} = require('../controllers/productos.controllers');

const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos);

router.get(
  '/:id',
  [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatory').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

router.put(
  '/:id',
  [
    validarJWT,
    // check('categoria', 'La categoria no tiene ID de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
