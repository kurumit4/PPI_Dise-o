import { getArticulos } from "../controller/ArticuloController.js";
import express from 'express'

const router = express.Router()

router.get("/articulo", getArticulos)

export default router
