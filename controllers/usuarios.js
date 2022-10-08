const {request,response} = require ("express")

const Usuario = require("../models/usuario")
//GET
const usuariosGet = (req=request,res=response) => {
    res.json({
      msg: "peticion get-controllers",
    });
  }
  //GET
  
//POST
  const usuarioPost = async (req = request, res = response) => {
    const { nombre, email, password, role } = req.body;
  
    const usuario = new Usuario({ nombre, email, password, role });
  

    //  Guandando  usuario en la base de datos
    await usuario.save();
  
    res.status(201).json({
      msg: "usuario creado con exito!",
      usuario,
    });
  };
//POST

//PUT
 const usuarioPut = (req=request,res=response) => {
    const {id} = req.params;
    res.json({
      msg: "peticion put- controllers",
      id
    });
  }
//PUT
//DELETE
  const usuarioDelete =  (req=request,res=response) =>  {
    const {id} = req.params;
    res.json({
      msg: "peticion delete- controladores",
      id
    });
  }
  //DELETE 
  module.exports ={
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
  }