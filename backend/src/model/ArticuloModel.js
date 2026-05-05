import { poolConect } from '../config/db.js';
import sql from 'mssql';

const listarArticulos = async () => {
    const conn = await poolConect();
    const result = await conn.request().execute("sp_ListarArticulos");
    return result.recordset;
};

const obtenerArticulo = async (id) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_articulo', sql.BigInt, id)
        .execute("sp_ObtenerArticulo");
    return result.recordset[0];
};

const insertarArticulo = async (articulo) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_categoria', sql.BigInt,          articulo.id_categoria)
        .input('nombre',       sql.VarChar(200),    articulo.nombre)
        .input('descripcion',  sql.Text,            articulo.descripcion)
        .input('stock',        sql.Int,             articulo.stock)
        .input('precio',       sql.Decimal(12, 2),  articulo.precio)
        .input('estado',       sql.VarChar(20),     articulo.estado)
        .execute("sp_InsertarArticulo");
    return result.recordset[0];
};

const actualizarArticulo = async (id, articulo) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_articulo',  sql.BigInt,          id)
        .input('id_categoria', sql.BigInt,          articulo.id_categoria)
        .input('nombre',       sql.VarChar(200),    articulo.nombre)
        .input('descripcion',  sql.Text,            articulo.descripcion)
        .input('stock',        sql.Int,             articulo.stock)
        .input('precio',       sql.Decimal(12, 2),  articulo.precio)
        .input('estado',       sql.VarChar(20),     articulo.estado)
        .execute("sp_ActualizarArticulo");
    return result.recordset[0];
};

const eliminarArticulo = async (id) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_articulo', sql.BigInt, id)
        .execute("sp_EliminarArticulo");
    return result.recordset[0];
};

export { listarArticulos, obtenerArticulo, insertarArticulo, actualizarArticulo, eliminarArticulo };