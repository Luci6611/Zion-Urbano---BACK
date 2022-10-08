const {Router} = require("express");
const {check} = require("express-validator")
const { usuariosGet, usuarioPost, usuarioDelete, usuarioPut } = require("../controllers/usuarios");
const {validarCampos} = require("../middlewares/validar-campos")
const {Role} = require("../models/role")


const router =  Router();



router.get("/", usuariosGet);

  router.post("/",[
    check ("email","El correo no es valido").isEmail(),
    check ("nombre","El nombre es obligatorio").notEmpty(),
    check("password","la contraseña debe tener minimo 6 caracteres").isLength({min:6}),
    
    check("role").custom(async(role="")=>{
      const existeRole = await Role.findOne({role});  
    
    if(!existeRole){
        throw new Error(`El rol ${role} no existe en la BD`);
    }

    }),
    validarCampos
  ], usuarioPost );

    router.put("/:id", usuarioPut);

    router.delete("/:id",usuarioDelete );

    module.exports = router;