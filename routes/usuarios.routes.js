const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios.controllers");
const { esRoleValido, emailExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

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
    check("correo").custom(emailExiste),
    // check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    // check("role").custom((role) => esRoleValido(role)),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);
router.put("/:id", usuariosPut);
router.patch("/", usuariosPatch);
router.delete("/", usuariosDelete);

module.exports = router;
