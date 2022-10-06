const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.json({
    msg:"Hola mundo"
  })
})

app.listen(8080,()=>{
    console.log("Servidor online en puerto 8080")
})