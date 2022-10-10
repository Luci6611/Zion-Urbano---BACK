const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuarioPost,
  usuarioDelete,
  usuarioPut,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, emailExiste, idExiste } = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "la contraseña debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    check("role").custom(esRoleValido),

    validarCampos,
  ],
  usuarioPost
);

router.put("/:id",[
  check("id","No es un id de mongo valido").isMongoId(),
  check("id").custom(idExiste),
  validarCampos
], usuarioPut);

router.delete("/:id", usuarioDelete);


module.exports = router;
