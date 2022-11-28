import CarModel from "./Carro_compra.model.js";




export async function getUsers(query) {
    const docs = await Users.find()
    return docs
}

export async function logIn(body) {
    const docs = await Users.findById(body._id)
    return docs
}

export async function createUser(newUser) {
    const user = new Users(newUser)
    const result = await user.save()
    return result
}