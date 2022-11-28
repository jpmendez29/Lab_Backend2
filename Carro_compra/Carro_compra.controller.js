import CarModel from "./Carro_compra.model.js";
import ProdModel from "../Productos/Productos.model.js"
import HistModel from "../Historial/Historial.model.js"
import {Verifytoken} from "../helper/generatetoken.js"
import mongoose from 'mongoose'

// obtener carro usuario log (token)
export async function GetCar(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Car = await CarModel.find({Id_Usuario: tokendata._id}) // se puede usar _id carro ambos son unicos dentro del modelo
    return Car
}

// añadir producto al carrito (token)
export async function AddCar(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Car = await CarModel.find({Id_Usuario: tokendata._id}) // se puede usar _id carro ambos son unicos dentro del modelo
    const prod = await SerchProd(req.body.idprod)
    if (Car[0]){
        return await ActCar(req, prod, tokendata._id)
    }else{
        const carm = new CarModel(
            {  
            Productos: [{id_prod: prod._id, Producto: prod.Nombre, Precio: prod.Precio, cantidad: req.body.cant}],
            Total: (prod.Precio * req.body.cant),
            Id_Usuario: tokendata._id,
            }
            );
        await carm.save()
        console.log("Carro creado con exito")
        return carm
    }
}

// se elimina el carrito (token)
export async function DelProdCar(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Prod = CarModel.findOneAndDelete({Id_Usuario: tokendata._id})
    return ("se elimino el carro con exito")
}

// se compra el carrito, se agrega al historia y se elimina el carrito  (token)
export async function CompCar(req) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Car = await CarModel.find({Id_Usuario: tokendata._id}) // se puede usar _id carro ambos son unicos dentro del modelo
    if (Car){
        const Hist = new HistModel(
            {  
            Historial: Car[0],
            Id_Usuario: tokendata._id
            }
            );
        await Hist.save()
        console.log("Carro comprado con exito")
        console.log(await DelProdCar(req))
        return ("Carro comprado con exito")
    }else{
        return ("No hay productos a comprar")
    }
    
}

// funciones internas 

async function SerchProd (id){
    const Prod = await ProdModel.findById(id)
    return Prod
}

async function ActCar(req, prod, id){
    const P = await CarModel.aggregate([
        { $match: {Id_Usuario : mongoose.Types.ObjectId(id)} },
        {$project: { newTotal: { $add: ["$Total", (prod.Precio * req.body.cant)] } } }
    ])
    const Prod = await CarModel.findOneAndUpdate({Id_Usuario: id}, {$push: {Productos: {id_prod: prod._id, Producto: prod.Nombre, Precio: prod.Precio, cantidad: req.body.cant}}, Total: P[0].newTotal})
    console.log("Producto agregado")
    return ("Producto agregado")
}