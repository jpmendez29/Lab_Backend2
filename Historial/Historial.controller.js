import { Verifytoken } from "../helper/generatetoken.js"
import HistModel from "../Historial/Historial.model.js"

// obtener el historial (token)
export async function GetHist(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Hist = await HistModel.find({Id_Usuario: tokendata._id})
    return Hist
}
