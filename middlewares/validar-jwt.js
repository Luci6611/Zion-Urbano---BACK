const { request } = require("express");
const jwt = require("jsonwebtoken")
const Usuario = require("../models/usuario")
const validarJWT= async(req=request,res,next)=>{

  const token =  req.header("Authorization")
  if(!token){
    res.status(401).json({
        msg:"No se encuentra el token"
    })
  }
  try {

    const{userId} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)
   
    //leer datos del usuario
const usuario = await Usuario.findById(userId);

    //si el usuario no existe
    if(!usuario){
        return res.status(401).json({
            msg:"El token ingresado pertenece a un usuario que no existe"
        })
    }

    //verificar si el usuario esta activo
    if(!usuario.estado){
        return res.status(401).json({
            msg:"El token ingresado pertenece a un usuario inactivado"
        })
    }


    next()

    
  } catch (error) {
    console.log(error)
    res.status(401).json({
        msg:"token no valido"
    })
  }
}

module.exports = validarJWT;