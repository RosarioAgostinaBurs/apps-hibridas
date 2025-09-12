/* Traermos los nuevos archivos de rutas de la carptea 'routes'. */
const productRoute = require('./productRoute.js');
const userRoute = require('./userRoute.js');

/* Funion para delegar las rutas */
const rutas = (app) => {
    app.use('/api/users', userRoute); // Acá digo que cada vez que la app 'llame' a usuarios, lo delege al archivo 'userRoute'.
    app.use('/api/products', productRoute); // Llamar seria lo que le siga luego de mi ruta raíz.
}

module.exports = rutas;