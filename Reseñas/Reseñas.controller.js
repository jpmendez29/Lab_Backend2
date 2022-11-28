import ReseñasModel from "./Reseñas.model.js";
import UsersModel from "../Usuarios/Usuarios.model.js";
import {Verifytoken} from "../helper/generatetoken.js"



// Obtiene todos las Reseñas
export async function GetRes() {
    const Res = await ReseñasModel.find()
    return Res
}

// obtener reseñas de un usuario 
export async function GetResUs(body) {
    const us = await UsersModel.find({Usuario: body.us}) //usuario
    const Res = await ReseñasModel.find({Id_Usuario: us[0]._id}) // id usuario
    if (Res){
        console.log(Res)
        return Res
    }else{
        res.status(409).json("no se encontro reseñas de este usuario")
    }
}

// obtener reseñas de un producto
export async function GetResProd(body) {
    const Res = await ReseñasModel.find({Id_Producto: body._id}) //id producto
    if (Res){
        console.log(Res)
        return Res
    }else{
        res.status(409).json("no se encontro reseñas para este producto")
    }
}


// obtener reseñas segun puntuacion
export async function GetResPunt(body) {
    const Res = await ReseñasModel.find({Puntuacion: body.punt}) //Puntuacion
    if (Res){
        console.log(Res)
        return Res
    }else{
        res.status(409).json("no se encontro reseñas para este producto")
    }
}

// Crear una reseña (token)
export async function CrearRes(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Res = new ReseñasModel(
        {  
        Reseña: req.body.res, 
        Puntuacion: req.body.punt,
        Id_Usuario: tokendata._id,
        Id_Producto: req.body.idprod
        }
        );
    await Res.save()
    console.log("Reseña creada con exito")
    return Res
}


// Actualiza una reseña (token)
export async function ActRes(req){
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Us = await ReseñasModel.findByIdAndUpdate({_id: req.body._id, Id_Usuario: tokendata._id }, {Reseña:req.body.res, Puntuacion: req.body.punt})
    return ("se actualizo la reseña")
}


// Borrar una reseña (token)
export async function DelRes(req){
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Us = await ReseñasModel.findOneAndDelete({_id: req.body._id, Id_Usuario: tokendata._id})
    return ('La reseña fue borrada con exito')
}