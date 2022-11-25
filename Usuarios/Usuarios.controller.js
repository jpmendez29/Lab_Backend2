import Users from "./Usuarios.model.js";

const data = [
    {
        _id : 'f01209aj1d9011s',
        name: 'Andres',
        count: 0
    },
    {
        _id : 'ea09128f91012as',
        name: 'Roberto',
        count: 0
    },
    {
        _id : 'ea09128f91012at',
        name: 'Luis',
        count: 0
    },
]

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