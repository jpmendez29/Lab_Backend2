import ProdModel from "./Productos.model.js";
import CatModel from "../Categorias de productos/Cat_Productos.model.js";


// Mostrar todos los productos
export async function ProdAll(){
    const prod = await ProdModel.find()
    console.log("se Mostraron todos los productos")
    return prod
}


// Mostrar productos de un usuario  //revisar
export async function ProdUs(body) {
    const usuario = await UsModel.findById({_id: body._id})
    const Prod = await ProdModel.aggregate([
        {$lookup:{
            from: "Usuarios",
            localField: "_id",
            foreignField: "id_Producto",
            //pipeline: [{$project: { _id: 0, id_Usuario: 0, createdAt:0}}],
            as: "Product"
            },  
        },
        { $match: {_id: usuario.id_Producto}},
        { $unwind: "$Product"}
    ])
    const Productos = Prod.map(x => x.Product)
    console.log("se Mostraron los productos de un usuario")
    return Productos
}


// Mostrar producto individual 
export async function ProdIn(body){
    const prod = await ProdModel.findById(body._id)
    console.log("se Mostro el productos individual")
    return prod
}


// Mostrar producto segun nombre 
export async function ProdNom(body){
    const prod = await ProdModel.find({Nombre: body.Nombre})
    console.log("se Mostraron los productos segun Nombre")
    return prod
}


// Mostrar producto segun categoria 
export async function ProdCat(body){
    const cat = await CatModel.find({Nombre: body.CatName})
    const prod = await ProdModel.find({id_Categoria: cat._id})
    /* otra opcion es recibir el id de la categoria directamente
    const prod = await ProdModel.find({id_Categoria: body.Catid})
    */
    console.log("se Mostraron los productos segun categoria")
    return prod
}


// Crear un producto
export async function CreateProduct(body) {
    const id_cat = await CatModel.find(body.CatName)
    const Producto = new ProdModel(
        {   Nombre: body.Nombre, 
            Precio: body.Precio,
            id_Categoria: id_cat._id,
            id_usuario: id_usuario //login token
        }
        );
    await Producto.save()
    console.log("Producto creado con exito")
    return Producto
}


// Actualizar un Producto
export async function ActProd(body){
    const cat = await CatModel.find({Nombre: body.CatName})
    const Prod = await ProdModel.findOneAndUpdate({_id: body._id},{Nombre: body.Nombre, Precio: body.Precio, id_Categoria: cat._id})
    console.log("se actualizo el prodcuto")
    return prod
}


// Borrar una Producto
export async function DelProd(body){
    const prod = await PubModel.findOneAndDelete({_id: body._id})
    console.log('el producto fue borrado con exito')
    return prod
}