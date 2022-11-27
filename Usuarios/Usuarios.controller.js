import UsersModel from "./Usuarios.model.js";
import {Signtoken,Verifytoken} from "../helper/generatetoken.js"

// Obtiene todos los usuarios
export async function getUsers() {
    const docs = await UsersModel.find()
    return docs
}

// Obtiene el usuario de la sesion (token) endpoint adicional
export async function getUserslog(req,res,next) {
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const docs = await UsersModel.findById(tokendata._id)
    if (docs){
        console.log(docs)
        return docs
    }else{
        res.status(409).json("no se encontro el usuario")
    }
}


// Inicia sesion (crea token)
export async function logIn(body) {
    const user = await UsersModel.find({Usuario: body.us})
    if (user){
    if (user[0].Contraseña == body.pasw){
        return Signtoken(user[0]) //token
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
    const user = new UsersModel(
        {  
        Usuario: body.us, 
        Correo: body.email,
        Contraseña: body.pasw,
        }
        );
    await user.save()
    console.log("Usuario creado con exito")
    return user
}

// Actualizar un usuario (token)
export async function ActUs(req){
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const us = await UsersModel.findByIdAndUpdate({_id: tokendata._id}, {Usuario:req.body.us, Correo: req.body.email, Contraseña: req.body.pasw})
    return ("se actualizo el usuario")
}


// Borrar una usuario (token)
export async function DelUs(req){
    const token = req.headers.authorization.split(' ').pop()
    const tokendata = await Verifytoken(token)
    const us = await UsersModel.findOneAndDelete({_id: tokendata._id})
    return ('el usuario fue borrado con exito')
}