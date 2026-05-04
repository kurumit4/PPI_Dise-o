import { poolConect } from '../config/db.js';
import sql from 'mssql';
import bcrypt from 'bcrypt';

const listarUsuarios = async () => {
    try {
        const conn = await poolConect();
        const result = await conn.request().execute("sp_ListarUsuario");

        return result.recordset;
    } catch (error) {
        throw error;
    }
};

const insertarUsuario = async (usuario)  => {
      const passwordHasheada = await bcrypt.hash(usuario.password_hash, 10);
    try {
        const conn = await poolConect();
        const result = await conn.request()
            .input('id_rol', sql.BigInt, usuario.id_rol)
                .input('nombre', sql.VarChar, usuario.nombre)
            .input('apellido', sql.VarChar, usuario.apellido)
            .input('email', sql.VarChar, usuario.email)
            .input('estado', sql.VarChar, usuario.estado)
            .input('password_hash', sql.VarChar, passwordHasheada)
            .execute("sp_InsertarUsuario"); 
 
            return result;
    } catch (error) {
        throw error;
    }
};

const loginUsuario = async (email) => {
    try {
        const conn = await poolConect();
        const result = await conn.request()
            .input('email', sql.VarChar, email)
            .execute("sp_LoginUsuario");

        return result.recordset[0]; 
    } catch (error) {
        throw error;
    }
};


const getUsuarioById = async (id) => {
    try {
        const conn = await poolConect();
        const result = await conn.request() 
            .input('id_usuario', sql.BigInt,id)
            .execute("sp_ObtenerUsuarioPorId");

        return result.recordset[0];
    } catch (error) {
        throw new Error("Error al obtener el usuario");
    }
}

const updateUsuario = async (id, usuario) => {
    try {
        const conn = await poolConect();
        const request = conn.request()
            .input('id_usuario', sql.BigInt, id)
            .input('id_rol', sql.BigInt, usuario.id_rol)
            .input('nombre', sql.VarChar, usuario.nombre)
            .input('apellido', sql.VarChar, usuario.apellido)
            .input('email', sql.VarChar, usuario.email)
            .input('estado', sql.VarChar, usuario.estado);

        if (usuario.ppassword_hash) {
            const passwordHasheada = await bcrypt.hash(usuario.password_hash, 10);
            request.input('password_hash', sql.VarChar, passwordHasheada);
        }

        const result = await request.execute("sp_ActualizarUsuario");
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el usuario");
    }
}

const deleteUsuario = async (id) => {
    try {
        const conn = await poolConect();
        const result = await conn.request()
            .input('id_usuario', sql.BigInt, id)
            .execute("sp_EliminarUsuario");
        return result;
    } catch (error) {
        throw new Error("Error al eliminar el usuario");
    }
}



export { listarUsuarios, insertarUsuario, loginUsuario, getUsuarioById, updateUsuario, deleteUsuario };