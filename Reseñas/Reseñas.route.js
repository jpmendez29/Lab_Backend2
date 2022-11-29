import express from 'express'
import {GetRes, GetResUs, GetResProd, GetResPunt, CrearRes, ActRes, DelRes} from "./Reseñas.controller.js"
import { checkauth } from '../helper/generatetoken.js';

const router = express.Router();

// ****************** GET ******************

//Mostrar todas las reseñas
router.get('/', async (req, res) => {
    const Res = await GetRes()
    res.status(200).json(Res)
});

//Mostrar reseñas de un usuario 
router.get('/ResUs', async (req, res) => {
    const Res = await GetResUs(req.body)
    res.status(200).json(Res)
});

//Mostrar reseñas de un producto
router.get('/ResProd', async (req, res) => {
    const Res = await GetResProd(req.body)
    res.status(200).json(Res)
});

//Mostrar reseñas segun puntuacion
router.get('/ResPunt', async (req, res) => {
    const Res = await GetResPunt(req.body)
    res.status(200).json(Res)
});


// ****************** POST ******************

//Crear una reseña (token)
router.post('/', checkauth, async (req, res) => {
    const data = await CrearRes(req)
    res.status(200).json(data)
});

// ****************** PATCH *******************

// Actualizar reseña (token)
router.patch('/', checkauth, async (req, res)=> {
    const Res = await ActRes(req, res)
    res.status(200).json(Res)
});


// ****************** DELETE *******************


// Borrar una reseña (token)
router.delete('/', checkauth, async (req, res)=> {
    const Res = await DelRes(req)
    res.status(200).json(Res)
});

export default router;

