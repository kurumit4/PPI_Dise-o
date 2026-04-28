import { listarUsuarios } from "../model/UsuarioModel.js";
import { insertarUsuario } from "../model/UsuarioModel.js"; 
import { loginUsuario } from "../model/UsuarioModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await loginUsuario(email);

        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const validPassword = await bcrypt.compare(password, usuario.password_hash);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                email: usuario.email,
                rol: usuario.id_rol
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        res.json({
            success: true,
            message: "Login exitoso",
            token,
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en login",
            error: error.message
        });
    }
};

export { postUsuario, login, getUsuarios };