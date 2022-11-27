import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './Usuarios/Usuarios.route.js'; 
import {} from 'dotenv/config'
import jwt from 'jsonwebtoken'

const [user,pasw] = [process.env.USER, process.env.PASW]


export function TestApp() {
    // MIDDLEWARE JSON
    const app = express();

    app.use(express.json())

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    
    app.use('/Users', userRoutes)

    app.use(async (req, res) => {
        res.status(404).json({message: "Not found."})
    });
    return app
}


export function App() {
    const app = TestApp()

    // CONEXION MONGO
    mongoose.connect(
        "mongodb+srv://"+user+":"+pasw+"pn@labbackend.wsxmbzf.mongodb.net/Amazon?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch((e) => {
        console.log(e)
        console.log("Error de conexion")
    })

    return app
}
