import mongoose from "mongoose"
import { Verifytoken } from "../helper/generatetoken.js"
import HistModel from "../Historial/Historial.model.js"

// obtener el historial (token)
export async function GetHist(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Res = await HistModel.aggregate([
        {$match: {"Id_Usuario": mongoose.Types.ObjectId(tokendata._id)}},
        {$project: {Historial: { _id: 0, Id_Usuario: 0, Id_Usuario:0, createdAt: 0 , updatedAt:0, __v:0, Productos: {_id:0, id_prod:0}}}},
        {$project: { _id: 0, Id_Usuario: 0, Id_Usuario:0, createdAt: 0 , updatedAt:0, __v:0 }},
        
    ])
    return Res
}
