const { request } = require("express");
const jwt = require("jsonwebtoken")
const validarJWT=(req=request,res,next)=>{

  const token =  req.header("Authorization")
  if(!token){
    res.status(401).json({
        msg:"No se encuentra el token"
    })
  }
  try {

    jwt.verify(token,process.env.SECRETORPRIVATEKEY)

    next()

    
  } catch (error) {
    console.log(error)
    res.status(401).json({
        msg:"token no valido"
    })
  }
}

module.exports = validarJWT;