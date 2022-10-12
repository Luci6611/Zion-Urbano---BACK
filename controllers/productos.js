const { request, response } = require("express");
const Producto = require("../models/Producto");

//traer todos los productos paginados
const obtenerProductos = async (req=request,res=response)=>{
    const {limite = 6, desde = 0} =req.query;
    const query ={estado:true}

    const [total , productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("categoria","nombre")
        .populate("usuario","nombre")

    ])
    res.json({
        total,
        productos
})

}
//traer producto por id

const  obtenerProducto = async (req=request,res=response)=>{
        const {id} = req.params;

        const producto = await Producto.findById(id)
        .populate("categoria","nombre")
        .populate("usuario","nombre")

        res.json({
            producto
        })
        
}


//crear producto

const productoPost= async (req=request,res=response)=>{
    const {precio,categoria,descripcion,disponible,img} = req.body;
    const nombre = req.body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({nombre});


    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${productoDB.nombre} ya existe`
        })
    }
    //generar la data
    const data = {
        nombre,
        categoria,
        precio,
        descripcion,
        disponible,
        img,
        usuario:req.usuario._id
    };
    const producto = new Producto(data)

    //guardar en base de datos
    await producto.save()

    res.status(201).json({
        msg:"producto agregado",
        producto
    })

}

//actualizar producto
const actualizarProducto= async (req=request,res=response)=>{
    const {id} = req.params;
    const {precio,categoria,descripcion,disponible,img} = req.body;
    const usuario = req.usuario._id;

    const data ={
        precio,
        categoria,
        descripcion,
        disponible,
        img,
        usuario
    };

    if(req.body.nombre){
        data.nombre =req.body.nombre.toUpperCase();
    }

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.status(200).json({
        msg:"producto actualizado correctamente",
        producto


    })


}

//inactivar producto
const borrarProducto= async (req=request,res=response)=>{
    const {id} = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})

res.json({
    msg:"producto borrado correctamente",
    productoBorrado
})
}

module.exports ={
    obtenerProductos,
    obtenerProducto ,
    productoPost,
    actualizarProducto,
    borrarProducto
    

}