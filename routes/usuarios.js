const {Router} = require("express");
const { usuariosGet, usuarioPost, usuarioDelete, usuarioPut } = require("../controllers/usuarios");


const router =  Router();



router.get("/", usuariosGet);

  router.post("/", usuarioPost );

    router.put("/:id", usuarioPut);

    router.delete("/:id",usuarioDelete );

    module.exports = router;