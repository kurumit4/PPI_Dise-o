import { verificarToken } from '../middleware/authMiddleware.js';
import express from 'express';
import { getCarrito, postAgregarProducto, putCantidad, deleteProducto, postConfirmarCompra } from '../controller/CarritoController.js';
router.get('/carrito/:id_usuario',           verificarToken, getCarrito);
router.post('/carrito/agregar',              verificarToken, postAgregarProducto);
router.put('/carrito/cantidad/:id_detalle',  verificarToken, putCantidad);
router.delete('/carrito/quitar/:id_detalle', verificarToken, deleteProducto);
router.post('/carrito/confirmar',            verificarToken, postConfirmarCompra);