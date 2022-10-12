const {Router} = require("express");
const {check} = require("express-validator");
const { obtenerProductos, obtenerProducto, productoPost, actualizarProducto, borrarProducto } = require("../controllers/productos");
const {productoExiste} = require("../helpers/db-validators")
const { validarCampos } = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");
const esAdminRole = require("../middlewares/validar-role");



const router = Router()

router.get("/",obtenerProductos)

router.get("/:id",[
        check("id","El id no es valido").isMongoId(),
        check("id").custom(productoExiste),
        validarCampos
],obtenerProducto)

router.post("/",[
    validarJWT,
    esAdminRole,
    check("nombre","El nombre es obligatorio").notEmpty(),
    check("categoria","La categoria es obligatoria").notEmpty(),
    validarCampos
],productoPost)

router.put("/:id",[
    validarJWT,
    esAdminRole,
    check("id","El id no es valido").isMongoId(),
        check("id").custom(productoExiste),
        validarCampos,
],actualizarProducto)

router.delete("/:id",[
    validarJWT,
    esAdminRole,
    check("id","El id no es valido").isMongoId(),
        check("id").custom(productoExiste),
        validarCampos,
],borrarProducto)

module.exports = router;
