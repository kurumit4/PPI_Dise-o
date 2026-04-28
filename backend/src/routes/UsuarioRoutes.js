import express from 'express'
import { getUsuarios, postUsuario } from "../controller/UsuarioController.js";
import { login } from '../controller/UsuarioController.js';

const router = express.Router()

router.get("/usuario", getUsuarios)
router.post("/usuario", postUsuario)
router.post('/login', login);



export default router
