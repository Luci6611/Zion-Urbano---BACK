const {request,response} = require ("express");

const bcrypt = require('bcryptjs');


const Usuario = require("../models/usuario")

//GET
const usuariosGet = async (req=request,res=response) => {

 // paginacion usuarios
 const {limite =6, desde=0} = req.query;

 const usuarios = await Usuario.find({estado:true}).skip(desde).limit(limite);

 const total = await Usuario.countDocuments({estado:true});
 
   res.json({
     total,
     usuarios,
   });
  }
  //GET
  
//POST
const usuarioPost = async (req = request, res = response) => {
 
  const { nombre, email, password, role } = req.body;

  const usuario = new Usuario({ nombre, email, password, role });


   //encriptar contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  //  Guandando  usuario en la base de datos
  await usuario.save();

  res.status(201).json({
    msg: "usuario creado con exito!",
    usuario,
  });
};
//POST

//PUT
 const usuarioPut = async (req=request,res=response) => {
    const {id} = req.params;
    const {_id,password,email,...resto} =req.body;
    if(password){  
    //encriptar contraseña
  const salt = bcrypt.genSaltSync();
  resto.password = bcrypt.hashSync(password, salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id,resto,{new:true})

    res.json({
      msg: "usuario actualizado",
      usuario,
    });
  }
//PUT
//DELETE

const usuarioDelete = async (req, res)=> {
  const { id } = req.params;
  const usuarioAutentificado= req.usuario
  // inactivar usuario
  const usuarioBorrado = await Usuario.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json({
      msg:"usuario inactivado correctamente de la base de datos", 
      usuarioBorrado,
      usuarioAutentificado
     
    });
    }
  //DELETE 
  module.exports ={
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
  }