import { listarUsuarios } from "../model/UsuarioModel.js";
import { insertarUsuario } from "../model/UsuarioModel.js"; 
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

const postUsuario = async (req, res) => {
    try {
        const data = await insertarUsuario(req.body);

        res.status(201).json({
            success: true,
            message: "Usuario creado exitosamente",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear el usuario",
            error: error.message
        });
    }
};

export { postUsuario };