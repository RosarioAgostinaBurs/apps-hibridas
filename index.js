const express = require('express');
const Product = require('./model/ProductManager.js');
const dotenv = require('dotenv');
const { request } = require('http');
const rutas = require('./routes/index.js'); // Importo el archivo index donde tengo las rutas, y donde estan también importados los archivos 'productRoute.js' y 'userRoute.js' con sus controladores.

console.log('API');

const model = new Product();

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());

// A las rutas tengo que si o si pasarle mi app.
rutas(app); 

app.get('/', (req, res) => {
    res.send(`Soy una Api :). Ir a <a href="/api/products">Productos</a>`);
});

app.listen(port, () => {
    console.log(`Servidor Web en el puerto ${port}`);
});

