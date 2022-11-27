import ProdModel from "./Productos.model.js";
import CatModel from "../Categorias de productos/Cat_Productos.model.js";


// Mostrar todos los productos
export async function ProdAll(){
    const prod = await ProdModel.find()
    console.log("se Mostraron todos los productos")
    return prod
}


// Mostrar productos de un usuario
export async function ProdUs(body) {
    const prod = await ProdModel.find({Id_Usuario: body._idus})
    console.log("se Mostraron los productos de un usuario")
    return Productos
}

// Mostrar productos de un usuario (token)
export async function ProdUsT(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const prod = await ProdModel.find({Id_Usuario: tokendata._id})
    console.log("se Mostraron los productos de un usuario")
    return prod
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
            id_usuario: body._idus 
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