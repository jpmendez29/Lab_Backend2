import ProdModel from "./Productos.model.js";
import CatModel from "../Categorias de productos/Cat_Productos.model.js";
import {Verifytoken} from "../helper/generatetoken.js"

// Mostrar todos los productos
export async function ProdAll(){
    const Prod = await ProdModel.find()
    console.log("se Mostraron todos los productos")
    return Prod
}


// Mostrar productos de un usuario
export async function ProdUs(body) {
    const Prod = await ProdModel.find({Id_Usuario: body._idus})
    console.log("se Mostraron los productos de un usuario")
    return Prod
}

// Mostrar productos de un usuario (token)
export async function ProdUsT(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Prod = await ProdModel.find({Id_Usuario: tokendata._id})
    console.log("se Mostraron los productos de un usuario")
    return Prod
}


// Mostrar producto individual 
export async function ProdIn(body){
    const Prod = await ProdModel.findById(body._id)
    console.log("se Mostro el productos individual")
    return Prod
}


// Mostrar producto segun nombre 
export async function ProdNom(body){
    const Prod = await ProdModel.find({Nombre: body.ProdName})
    console.log("se mostraron los productos segun Nombre")
    return Prod
}


// Mostrar producto segun categoria 
export async function ProdCat(body){
    const id_cat = await CatModel.find({Nombre: body.CatName})
    const Prod = await ProdModel.find({id_Categoria: id_cat[0]._id})
    /* otra opcion es recibir el id de la categoria directamente
    const prod = await ProdModel.find({id_Categoria: body.Catid})
    */
    console.log("se Mostraron los productos segun categoria")
    return Prod
}


// Crear un producto
export async function CreateProduct(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const id_cat = await CatModel.find({Nombre: req.body.CatName})
    const Prod = new ProdModel(
        {   Nombre: req.body.Nombre, 
            Precio: req.body.Precio,
            Id_Categoria: id_cat[0]._id,
            Id_Usuario: tokendata._id 
        }
        );
    await Prod.save()
    console.log("Producto creado con exito")
    return Prod
}


// Actualizar un Producto
export async function ActProd(req){
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const id_cat = await CatModel.find({Nombre: req.body.CatName})
    const Prod = await ProdModel.findOneAndUpdate({_id: req.body._id, Id_Usuario:tokendata._id },{Nombre: req.body.Nombre, Precio: req.body.Precio, id_Categoria: id_cat[0]._id})
    return ("se actualizo el prodcuto")
}


// Borrar una Producto
export async function DelProd(req){
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Prod = await ProdModel.findOneAndDelete({_id: req.body._id, Id_Usuario:tokendata._id})
    return ('el producto fue borrado con exito')
}