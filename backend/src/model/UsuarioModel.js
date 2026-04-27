import { poolConect } from '../config/db.js';

const listarUsuarios = async () => {
    try {
        const conn = await poolConect();
        const result = await conn.request().execute("sp_ListarUsuario");

        return result.recordset;
    } catch (error) {
        throw error;
    }
};

export { listarUsuarios };

const insertarUsuario = async (usuario)  => {
    try {
        const conn = await poolConect();
        const result = await conn.request()
            .input('id_rol', sql.BigInt, usuario.id_rol)
                .input('nombre', sql.VarChar, usuario.nombre)
            .input('apellido', sql.VarChar, usuario.apellido)
            .input('email', sql.VarChar, usuario.email)
            .input('estado', sql.VarChar, usuario.estado)
            .execute("sp_InsertarUsuario"); // tu SP para insertar usuario

            return result;
    } catch (error) {
        throw error;
    }
};

export { listarUsuarios, insertarUsuario };