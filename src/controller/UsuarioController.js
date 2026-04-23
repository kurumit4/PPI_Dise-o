import { listarUsuarios } from "../model/UsuarioModel.js";

const getUsuarios = async (req, res) =>{

    try {
        
        const usuarios = await listarUsuarios()
        res.status(200).json({
            success : true,
            data : usuarios
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error al obtener las usuarios",
            error: error.message
        })
    }

}

export {getUsuarios}