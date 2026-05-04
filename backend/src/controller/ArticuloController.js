import { listarArticulos, obtenerArticulo, insertarArticulo, actualizarArticulo, eliminarArticulo } from "../model/ArticuloModel.js";

const getArticulos = async (req, res) => {
    try {
        const articulos = await listarArticulos();
        res.status(200).json({ success: true, data: articulos });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al listar artículos", error: error.message });
    }
};

const getArticulo = async (req, res) => {
    try {
        const articulo = await obtenerArticulo(req.params.id);
        if (!articulo) {
            return res.status(404).json({ success: false, message: "Artículo no encontrado" });
        }
        res.status(200).json({ success: true, data: articulo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener artículo", error: error.message });
    }
};

const postArticulo = async (req, res) => {
    try {
        const { id_categoria, nombre, descripcion, stock, precio, estado } = req.body;

        // validaciones básicas
        if (!nombre || !precio || !stock || !id_categoria) {
            return res.status(400).json({ success: false, message: "nombre, precio, stock y categoría son obligatorios" });
        }

        const data = await insertarArticulo({ id_categoria, nombre, descripcion, stock, precio, estado });
        res.status(201).json({ success: true, message: "Artículo creado exitosamente", data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al crear artículo", error: error.message });
    }
};

const putArticulo = async (req, res) => {
    try {
        const { id_categoria, nombre, precio, stock } = req.body;

        if (!nombre || !precio || !stock || !id_categoria) {
            return res.status(400).json({ success: false, message: "nombre, precio, stock y categoría son obligatorios" });
        }

        const data = await actualizarArticulo(req.params.id, req.body);
        res.status(200).json({ success: true, message: "Artículo actualizado exitosamente", data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar artículo", error: error.message });
    }
};

const deleteArticulo = async (req, res) => {
    try {
        await eliminarArticulo(req.params.id);
        res.status(200).json({ success: true, message: "Artículo eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar artículo", error: error.message });
    }
};

export { getArticulos, getArticulo, postArticulo, putArticulo, deleteArticulo };