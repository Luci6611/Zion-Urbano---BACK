const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");


const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    //verificar si email existe
    const usuario = await Usuario.findOne({ email });

    if(!usuario){
        return res.status(400).json({
            msg:"El Email o la Contraseña son incorrectos"
        })
    }

    //verificar si usuario esta activo
    if(!usuario.estado){
        return res.status(400).json({
            msg: "usuario suspendido"
        })
    }

    //verificar la contraseña
    const validaPassword=bcrypt.compareSync(password,usuario.password)

    if(!validaPassword){
        return res.status(400).json({
            msg:"El Email o la Contraseña son incorrectos"
        })
    }

    //generar un token

    res.json({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "comuniquese con  el administrador",
    });
  }
};
module.exports = login;
