import express from 'express'
import {GetCar, AddCar, CompCar, DelCar} from "./Carro_compra.controller.js"
import { checkauth } from '../helper/generatetoken.js';

const router = express.Router();


// ****************** GET ******************

// se obtiene el carrito
router.get('/',checkauth, async (req, res) => {
    const Car = await GetCar(req)
    res.status(200).json(Car)
});


// ****************** POST ******************

// Se añaden productos al carrito
router.post('/',checkauth, async (req, res) => {
    const Car = await AddCar(req)
    res.status(201).json(Car)
});


// ****************** PATCH ******************

// Compra carrito / agregar historial de compra 
router.patch('/',checkauth, async (req, res) => {
    const Car = await CompCar(req)
    res.status(200).json(Car)
});


// ****************** DELETE ******************

// se elimina el carrito
router.delete('/',checkauth, async (req, res) => {
    const Car = await DelCar(req)
    res.status(204).json(Car)
});

export default router;