import ReseñasModel from "./Reseñas.model.js";
import UsersModel from "../Usuarios/Usuarios.model.js";
import {Verifytoken} from "../helper/generatetoken.js"
import mongoose from "mongoose";


// Obtiene todos las Reseñas
export async function GetRes() {
    const Res = await ReseñasModel.aggregate([
        {$lookup:{
            from: "Producto",
            localField: "Id_Producto",
            foreignField: "_id",
            pipeline: [{$project: { _id: 0, Nombre:1}}],
            as: "Producto"
            }
        },
        { $unwind: "$Producto"},
        {$lookup:{
            from: "Usuarios",
            localField: "Id_Usuario",
            foreignField: "_id",
            pipeline: [{$project: {_id: 0 ,Usuario: 1}}],
            as: "Usuario"
            }
        },
        { $unwind: "$Usuario"},
        {$project: { _id: 0, Id_Producto: 0, Id_Usuario:0, createdAt: 0 , updatedAt:0, __v:0}},
    ])
    return Res
}

// obtener reseñas de un usuario 
export async function GetResUs(body) {
    const us = await UsersModel.find({Usuario: body.us}) //usuario
        const Res = await ReseñasModel.aggregate([
            {$match: {"Id_Usuario": mongoose.Types.ObjectId(us[0]._id)}},
            {$lookup:{
                from: "Producto",
                localField: "Id_Producto",
                foreignField: "_id",
                pipeline: [{$project: { _id: 0, Nombre:1}}],
                as: "Producto"
                }
            },
            { $unwind: "$Producto"},
            {$lookup:{
                from: "Usuarios",
                localField: "Id_Usuario",
                foreignField: "_id",
                pipeline: [{$project: {_id: 0 ,Usuario: 1}}],
                as: "Usuario"
                }
            },
            { $unwind: "$Usuario"},
            {$project: { _id: 0, Id_Producto: 0, Id_Usuario:0, createdAt: 0 , updatedAt:0, __v:0}},
        ])
        return Res
}

// obtener reseñas de un producto
export async function GetResProd(body) {
    const Res = await ReseñasModel.aggregate([
        {$match: {"Id_Producto": mongoose.Types.ObjectId(body._id)}},
        {$lookup:{
            from: "Producto",
            localField: "Id_Producto",
            foreignField: "_id",
            pipeline: [{$project: { _id: 0, Nombre:1}}],
            as: "Producto"
            }
        },
        { $unwind: "$Producto"},
        {$lookup:{
            from: "Usuarios",
            localField: "Id_Usuario",
            foreignField: "_id",
            pipeline: [{$project: {_id: 0 ,Usuario: 1}}],
            as: "Usuario"
            }
        },
        { $unwind: "$Usuario"},
        {$project: { _id: 0, Id_Producto: 0, Id_Usuario:0, createdAt: 0 , updatedAt:0, __v:0}},
    ])
    return Res
}


// obtener reseñas segun puntuacion
export async function GetResPunt(body) {
    const Res = await ReseñasModel.aggregate([
        {$match: {"Puntuacion": Number(body.punt)}},
        {$lookup:{
            from: "Producto",
            localField: "Id_Producto",
            foreignField: "_id",
            pipeline: [{$project: { _id: 0, Nombre:1}}],
            as: "Producto"
            }
        },
        { $unwind: "$Producto"},
        {$lookup:{
            from: "Usuarios",
            localField: "Id_Usuario",
            foreignField: "_id",
            pipeline: [{$project: {_id: 0 ,Usuario: 1}}],
            as: "Usuario"
            }
        },
        { $unwind: "$Usuario"},
        {$project: { _id: 0, Id_Producto: 0, Id_Usuario:0, createdAt: 0 , updatedAt:0, __v:0}},
    ])
    return Res
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
    return ("Reseña creada con exito")
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