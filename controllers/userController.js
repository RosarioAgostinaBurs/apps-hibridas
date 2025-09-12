/* En este archivo tenemos todo lo que es el control y la lógica de las rutas de Usuarios */

const User = require('../model/User');
const userModel = new User();

const getUser = async (req, res) => {
    try {
        const usuarios = await userModel.getUsers();
        res.json(usuarios);
    } catch(error) {
        res.status(500).json({mensaje: 'Error', error: error});
    }
}

const addUser = async (req, res) => {
    try {
        const usuario = req.body;
        const {nombre, email, password} = usuario;
        if(!nombre || !email || !password) {
            res.status(400).json({mensaje: 'Los campos son incorrectos'});
            return;
        }
        const nuevoUsuario = await userModel.addUsers(usuario);
        res.status(201).json({mensaje: 'Usuario creado', idUsuario: nuevoUsuario});
    } catch(error) {
        res.status(500).json({mensaje: 'Error al crear el usuario', error: error});
    }
}

module.exports = {getUser, addUser};