import CarModel from "./Carro_compra.model.js";
import ProdModel from "../Productos/Productos.model.js"
import HistModel from "../Historial/Historial.model.js"

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
    const prod = SerchProd(req.body.idprod)
    if (Car){
        return ActCar(req, prod[0], tokendata._id)
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
            Hist: [Car[0]],
            Id_Usuario: tokendata._id
            }
            );
        await Hist.save()
        console.log("Carro comprado con exito")
        await DelProdCar(req)
        return ("Carro comprado con exito")
    }else{
        return ("No hay productos a comprar")
    }
    
}

// funciones internas 

async function SerchProd (id){
    const Prod = ProdModel.findById(id)
    return Prod[0]
}

async function ActCar(req, prod, id){
    const Prod = ProdModel.findOneAndUpdate({Id_Usuario: id}, {$push: {Productos: {id_prod: prod._id, Producto: prod.Nombre, Precio: prod.Precio, cantidad: req.body.cant}}, Total: (prod.Precio * req.body.cant)})
    return Prod
}