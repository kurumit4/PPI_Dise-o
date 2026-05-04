import express from 'express'
import { getUsuarios, postUsuario } from "../controller/UsuarioController.js";
import { login } from '../controller/UsuarioController.js';
import {putUsuario} from '../controller/UsuarioController.js';
import {deleteUsuario} from '../controller/UsuarioController.js';
import {getUsuario} from '../controller/UsuarioController.js';
const router = express.Router()

router.get('/usuarios', getUsuarios);         // todos
router.get('/usuarios/:id', getUsuario);      // uno
router.post('/usuarios', postUsuario);         // crear
router.put('/usuarios/:id', putUsuario);       // actualizar
router.delete('/usuarios/:id', deleteUsuario); // eliminar
router.post('/login', login);

export default router
