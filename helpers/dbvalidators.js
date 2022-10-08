 //  validando si email existe en la base de datos
 const emailExiste =async(email)=>{
    
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
        throw new Error(`El correo ${email} ya existe en la BD`);
    };
    }