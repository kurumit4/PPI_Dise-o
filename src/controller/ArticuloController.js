import { ListarArticulo } from "../model/ArticuloModel.js";

const getArticulos = async (req, res) =>{

    try {
        
        const Articulos = await ListarArticulos()
        res.status(200).json({
            success : true,
            data : Articulos
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error al obtener las Articulos",
            error: error.message
        })
    }

}

export {getArticulos}