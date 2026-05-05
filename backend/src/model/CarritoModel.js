import { poolConect } from '../config/db.js';
import sql from 'mssql';

const obtenerCarrito = async (id_usuario) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_usuario', sql.BigInt, id_usuario)
        .execute("sp_ObtenerCarrito");
    return result.recordset;
};

const agregarAlCarrito = async (id_usuario, id_articulo, cantidad) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_usuario',  sql.BigInt, id_usuario)
        .input('id_articulo', sql.BigInt, id_articulo)
        .input('cantidad',    sql.Int,    cantidad)
        .execute("sp_AgregarAlCarrito");
    return result.recordset[0];
};

const actualizarCantidad = async (id_detalle, cantidad) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_detalle', sql.BigInt, id_detalle)
        .input('cantidad',   sql.Int,    cantidad)
        .execute("sp_ActualizarCantidad");
    return result.recordset[0];
};

const quitarDelCarrito = async (id_detalle) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_detalle', sql.BigInt, id_detalle)
        .execute("sp_QuitarDelCarrito");
    return result.recordset[0];
};

const confirmarCompra = async (id_usuario) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_usuario', sql.BigInt, id_usuario)
        .execute("sp_ConfirmarCompra");
    return result.recordset[0];
};

export { obtenerCarrito, agregarAlCarrito, actualizarCantidad, quitarDelCarrito, confirmarCompra };