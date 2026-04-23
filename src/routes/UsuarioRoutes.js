import { getUsuarios } from "../controller/UsuarioController.js";
import express from 'express'

const router = express.Router()

router.get("/usuario", getUsuarios)

export default router
