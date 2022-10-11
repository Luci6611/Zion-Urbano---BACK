const jwt =require("jsonwebtoken");

const generarJWT = (userId)=>{

return new Promise((resolve,reject)=>{
    const payload = {userId} 

    jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{expiresIn:"4h"},(err,token)=>{
        if(err){
            console.log(err)
            reject("No se genero el token")

        }
        else{
            resolve(token)
        }
    })
})

}
module.exports = generarJWT;