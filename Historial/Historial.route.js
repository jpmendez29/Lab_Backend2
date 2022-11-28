import express from 'express'
import {GetHist} from "./Historial.controller.js"
import { checkauth } from '../helper/generatetoken.js';

const router = express.Router();


// ****************** GET ******************

// se obtiene el carrito
router.get('/', checkauth, async (req, res) => {
    const Car = await GetHist(req)
    res.status(200).json(Car)
});


export default router;