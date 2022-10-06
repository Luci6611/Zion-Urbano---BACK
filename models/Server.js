const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port =process.env.PORT
    this.usuariosPath ="/api/usuarios"
    // middlewares


     // rutas
     this.routes()

  }
  middleware() {

  }
  routes() {
this.app.use(this.usuariosPath, require("../routes/usuarios"))
  
    

  }
  listen(){
    this.app.listen(this.port,()=>{
        console.log("Servidor online en puerto", this.port)
    })
  }
}

module.exports = Server;