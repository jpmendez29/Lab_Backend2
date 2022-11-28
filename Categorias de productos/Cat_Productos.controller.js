import CatModel from "./Cat_Productos.model.js";
import { Verifytoken } from "../helper/generatetoken.js";

// obtener todas las categorias
export async function GetCat() {
    const Cat = await CatModel.find()
    return Cat
}

// crear una categoria
export async function CreatCat(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Cat = new CatModel({  
        Nombre: req.body.Cat, 
        Id_Usuario: tokendata._id,
        }
    );
    await Cat.save()
    console.log("Categoria creada con exito")
    return Cat
}

// Actualiza una categoria (token)
export async function ActCat(body){
    const Cat = await CatModel.findByIdAndUpdate({_id: body._id}, {Nombre: body.Cat}) // por id, actualiza nombre
    return ("se actualizo la categoria")
}


// Borrar una categoria (token)
export async function DelCat(req){
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Cat = await CatModel.findOneAndDelete({Nombre: req.body.Cat, Id_Usuario: tokendata._id}) // por nombre (unico)
    // const Catid = await CatModel.find({Nombre: body.Cat})
    // const Cat = await CatModel.findOneAndDelete({Nombre: Catid[0]._id, Id_Usuario: tokendata._id}) // por id
    return ('La categoria fue borrada con exito')
}