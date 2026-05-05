import { obtenerCarrito, agregarAlCarrito, actualizarCantidad, quitarDelCarrito, confirmarCompra } from "../model/CarritoModel.js";

const getCarrito = async (req, res) => {
    try {
        const data = await obtenerCarrito(req.params.id_usuario);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener carrito", error: error.message });
    }
};

const postAgregarProducto = async (req, res) => {
    try {
        const { id_usuario, id_articulo, cantidad } = req.body;
        if (!id_usuario || !id_articulo || !cantidad) {
            return res.status(400).json({ success: false, message: "id_usuario, id_articulo y cantidad son obligatorios" });
        }
        const data = await agregarAlCarrito(id_usuario, id_articulo, cantidad);
        res.status(201).json({ success: true, message: "Producto agregado al carrito", data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al agregar producto", error: error.message });
    }
};

const putCantidad = async (req, res) => {
    try {
        const { cantidad } = req.body;
        if (!cantidad || cantidad < 1) {
            return res.status(400).json({ success: false, message: "La cantidad debe ser mayor a 0" });
        }
        const data = await actualizarCantidad(req.params.id_detalle, cantidad);
        res.status(200).json({ success: true, message: "Cantidad actualizada", data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar cantidad", error: error.message });
    }
};

const deleteProducto = async (req, res) => {
    try {
        await quitarDelCarrito(req.params.id_detalle);
        res.status(200).json({ success: true, message: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar producto", error: error.message });
    }
};

const postConfirmarCompra = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const data = await confirmarCompra(id_usuario);
        res.status(200).json({ success: true, message: "Compra confirmada", data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al confirmar compra", error: error.message });
    }
};

export { getCarrito, postAgregarProducto, putCantidad, deleteProducto, postConfirmarCompra };