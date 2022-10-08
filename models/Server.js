const express = require("express");
const {dbConnection} = require ("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port =process.env.PORT
    this.usuariosPath ="/api/usuarios"
    //conectar db
    this.conectarDb();
    
    // middlewares
    this.middleware();

     // rutas
     this.routes();
    }
    //conectar bd
   async conectarDb(){
      await dbConnection();
    }
  
  middleware() {
    // leer el body
    this.app.use(express.json());
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
