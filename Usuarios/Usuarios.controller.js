import UsersModel from "./Usuarios.model.js";
import {Signtoken,Verifytoken} from "../helper/generatetoken.js"

// Obtiene todos los usuarios
export async function getUsers() {
    const Us = await UsersModel.find()
    return Us
}

// Obtiene el usuario de la sesion (token) endpoint adicional
export async function getUserslog(req, res) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Us = await UsersModel.findById(tokendata._id)
    if (Us){
        console.log(Us)
        return Us
    }else{
        res.status(409).json("no se encontro el usuario")
    }
}


// Inicia sesion (crear token)
export async function logIn(body) {
    const Us = await UsersModel.find({Usuario: body.us})
    if (Us){
    if (Us[0].Contraseña == body.pasw){
        return Signtoken(Us[0]) //token
    }else{
        console.log("usuario o contraseña incorrectos")
        return ("usuario o contraseña incorrectos")
    }
    }else{
        return("usuario o contraseña incorrectos")
    }

}


// Crear un usuario
export async function createUser(body) {
    const Us = new UsersModel(
        {  
        Usuario: body.us, 
        Correo: body.email,
        Contraseña: body.pasw,
        }
        );
    await Us.save()
    console.log("Usuario creado con exito")
    return Us
}

// Actualizar un usuario (token)
export async function ActUs(req){
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Us = await UsersModel.findByIdAndUpdate({_id: tokendata._id}, {Usuario:req.body.us, Correo: req.body.email, Contraseña: req.body.pasw})
    return ("se actualizo el usuario")
}


// Borrar una usuario (token)
export async function DelUs(req){
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const Us = await UsersModel.findOneAndDelete({_id: tokendata._id})
    return ('el usuario fue borrado con exito')
}