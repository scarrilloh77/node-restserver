const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios.controllers");
const { validarCampos } = require("../middlewares/validar-campos");
const Role = require("../models/role");

const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser de más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(), //check es un middleware!
    // check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(async (role = "") => {
      const existeRole = await Role.findOne({ role: role });
      if (!existeRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
      }
    }),
    validarCampos,
  ],
  usuariosPost
);
router.put("/:id", usuariosPut);
router.patch("/", usuariosPatch);
router.delete("/", usuariosDelete);

module.exports = router;
