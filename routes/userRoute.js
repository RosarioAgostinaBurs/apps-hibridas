const express = require('express');
const router = express.Router();
const {getUser, addUser} = require('../controllers/userController'); // Traemos el Controlador de User que es el que tiene toda la lógica de las rutas

// Traemos la funcion getUser que esta en el userController, esta funcion tiene toda la lógica de la ruta
router.get('/', getUser);

// Traemos la funcion addUser que esta en el userController, esta funcion tiene toda la lógica de la ruta
router.post('/', addUser);

module.exports = router;