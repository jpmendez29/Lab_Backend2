import express from 'express'
import {GetCat, CreatCat, ActCat, DelCat} from "./Cat_Productos.controller"
import { checkauth } from '../helper/generatetoken.js';
const router = express.Router();

// ****************** GET ******************


// Mostrar todas las categorias
router.get('/', async (req, res) => {
    const Cat = await GetCat()
    res.status(200).json(Cat)
});


// ****************** POST ******************

// crear una categoria (token)
router.post('/', checkauth, async (req, res) => {
    const Cat = await CreatCat(req)
    res.status(200).json(Cat)
});


// ****************** PATCH ******************


// Actualizar una categoria (token)
router.patch('/', checkauth, async (req, res)=> {
    const Cat = await ActCat(req.body) // Nombre categoria, Nombre producto y Precio producto
    res.status(200).json(Cat)
});


// ****************** DELETE ******************


// Borrar una categoria (token)
router.delete('/',checkauth, async (req, res)=> {
    const Cat = await DelCat(req)
    res.status(200).json(Cat)
});
export default router;


