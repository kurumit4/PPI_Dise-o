import {sql, poolConect} from '../config/db.js'

const listarUsuarios= async(req, res) =>{

    try {
        
        const conn = await poolConect
        const resul = await conn.request().execute("sp_ListarUsarios")
        return resul.recordset

    } catch (error) {
        throw error
    }

}

export {listarUsuarios}