import express from 'express';
import { getArticulos, getArticulo, postArticulo, putArticulo, deleteArticulo } from '../controller/ArticuloController.js';
import { verificarToken, soloAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/articulos',     getArticulos);
router.get('/articulos/:id', getArticulo);

router.post('/articulos',        verificarToken, soloAdmin, postArticulo);
router.put('/articulos/:id',     verificarToken, soloAdmin, putArticulo);
router.delete('/articulos/:id',  verificarToken, soloAdmin, deleteArticulo);

export default router;