import {poolConect} from '../config/db.js'
import sql from 'mssql'
const ListarArticulos= async() =>{

    try {
        
        const conn = await poolConect
        const resul = await conn.request().execute("sp_ListarArticulo")
        return resul.recordset

    } catch (error) {
        throw error
    }

}

const obtenerArticuloPorId = async (id) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_articulo', sql.BigInt, id)
        .execute("sp_ObtenerArticuloPorId");
    return result.recordset[0];
};

const insertarArticulo = async (articulo) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_categoria', sql.BigInt, articulo.id_categoria)
        .input('nombre', sql.VarChar, articulo.nombre)
        .input('descripcion', sql.VarChar, articulo.descripcion)
        .input('stock', sql.Int, articulo.stock)
        .input('precio', sql.Decimal(12, 2), articulo.precio)
        .input('estado', sql.VarChar, articulo.estado)
        .execute("sp_InsertarArticulo");
    return result;
};

const actualizarArticulo = async (id, articulo) => {
    const conn = await poolConect();
    const result = await conn.request()
        .input('id_articulo', sql.BigInt, id)
        .input('id_categoria', sql.BigInt, articulo.id_categoria)
        .input('nombre', sql.VarChar, articulo.nombre)
        .input('descripcion', sql.VarChar, articulo.descripcion)
        .input('stock', sql.Int, articulo.stock)
        .input('precio', sql.Decimal(12, 2), articulo.precio)
        .input('estado', sql.VarChar, articulo.estado)
        .execute("sp_ActualizarArticulo");
    return result;
};

const eliminarArticulo = async (id) => {
    const conn = await poolConect();
    const result = await conn.request()
    .input('id_articulo', sql.BigInt, id)
    .execute("sp_EliminarArticulo");
    return result;
};

export {ListarArticulos, obtenerArticuloPorId, insertarArticulo, actualizarArticulo, eliminarArticulo}