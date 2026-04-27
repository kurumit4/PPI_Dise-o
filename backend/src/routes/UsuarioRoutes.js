import { getUsuarios, postUsuario } from "../controller/UsuarioController.js";
import express from 'express'

const router = express.Router()

router.get("/usuario", getUsuarios)
router.post("/usuario", postUsuario)

export default router
