import express from 'express'
import {createUser, getUsers, logIn} from "./Cat_Productos.controller"

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await getUsers(req.query, res)
    res.status(200).json(users)
});

router.post('/', async (req, res) => {
    const data = await createUser(req.body, res)

    res.status(200).json(data)
});

router.post('/login', async (req, res) => {
    const data = await logIn(req.body, res)
    res.status(200).json(data)
});


export default router;