import express from 'express';
import mongoose from 'mongoose';
import {} from 'dotenv/config'
import userRoutes from './Usuarios/Usuarios.route.js'; 
import CatRoutes from './Categorias de productos/Cat_Productos.route.js'; 
import ProdRoutes from './Productos/Productos.route.js';
import ResRoute from './Reseñas/Reseñas.route.js'
import HistRoute from './Historial/Historial.route.js'
import CarRoute from './Carro_compra/Carro_compra.route.js'



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

    // rutas
    app.use('/Users', userRoutes) // Usuarios
    app.use('/Prod', ProdRoutes) // Productos
    app.use('/Categ', CatRoutes) // Categorias
    app.use('/Res', ResRoute) // Reseñas
    app.use('/Hist', HistRoute) // Historial
    app.use('/Car', CarRoute) // Carro de compra

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
