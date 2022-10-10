const Role = require("../models/role");

const Usuario = require("../models/usuario")
//  validando si ROLE existe en la base de datos

const esRoleValido = async (role = "") => {
    const existeRole = await Role.findOne({ role });

    if (!existeRole) {
      throw new Error(`El rol ${role} no existe en la BD`);
    }
  }
 
 //validar si email existe
 
 const emailExiste =async(email)=>{
    
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
        throw new Error(`El correo ${email} ya existe en la BD`);
    };
    }
    // validar ruta put :id existe en la base de datos 
const idExiste =async(id)=>{
    
    const existeId = await Usuario.findOne({_id:id});
    if (!existeId) {
        throw new Error(`El id ${id} no existe en la Base de Datos`);
    };
    }

    module.exports = {
        esRoleValido,
        emailExiste,
        idExiste
    }