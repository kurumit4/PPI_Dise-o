import {sql, poolConect} from '../config/db.js'

const ListarArticulos= async(req, res) =>{

    try {
        
        const conn = await poolConect
        const resul = await conn.request().execute("sp_ListarArticulo")
        return resul.recordset

    } catch (error) {
        throw error
    }

}

export {ListarArticulos}