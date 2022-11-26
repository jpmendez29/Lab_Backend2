import express from 'express'
import {CreateProduct, ProdAll, ProdUs, ProdIn, ProdNom, ProdCat, ActProd, DelProd} from "./Productos.controller.js"

const router = express.Router();


// ****************** GET ******************


// Mostrar todos los productos
router.get('/', async (req, res) => {
    const Prod = await ProdAll(req.body, res) //
    res.status(200).json(JSON.stringify(Prod, null, 4))
});


// Mostrar productos de un usuario  //revisar
router.get('/ProdUs', async (req, res) => {
    const Prod = await ProdUs(req.body, res) // _id_usuarios_loging
    res.status(200).json(JSON.stringify(Prod, null, 4))
});


// Mostrar producto individual  
router.get('/ProdIn', async (req, res) => {
    const Prod = await ProdIn(req.body, res) // _id_producto
    res.status(200).json(JSON.stringify(Prod, null, 4))
});


// Mostrar producto segun nombre  
router.get('/ProdIn', async (req, res) => {
    const Prod = await ProdNom(req.body, res) // Nombre Producto
    res.status(200).json(JSON.stringify(Prod, null, 4))
});


// Mostrar producto segun categoria 
router.get('/ProdCat', async (req, res) => {
    const Prod = await ProdCat(req.body, res) // Nombre Categoria
    res.status(200).json(JSON.stringify(Prod, null, 4))
});



// ****************** POST ******************


// Crear un producto
router.post('/', async (req, res)=> {
    const Prod = await CreateProduct(req.body, res) // Nombre categoria, Nombre producto y Precio producto
    res.status(200).json(JSON.stringify(Prod, null, 4))
});



// ****************** PATCH ******************


// Actualizar publicacion de un usuario especifico
router.patch('/', async (req, res)=> {
    const Prod = await ActProd(req.body, res) // Nombre categoria, Nombre producto y Precio producto
    res.status(200).json(JSON.stringify(Prod, null, 4))
});



// ****************** DELETE ******************


// Borrar una publicacion de un usuario especifico, por medio del titulo de la publicacion
router.delete('/', async (req, res)=> {
    const Prod = await DelProd(req.body, res) // _id_producto
    res.status(200).json(JSON.stringify(Prod, null, 4))
});

export default router;