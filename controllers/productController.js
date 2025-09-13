const ProductManager = require('../model/ProductManager');
const productModel = new ProductManager();

const getProducts = async (req, res) => {
    try {
        const listado = await productModel.getProducts();
        res.json(listado);
    } catch(error) {
        res.status(500).json({mensaje: 'Error al obtener productos', error: error});
    }
}

const getProductsId = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await productModel.getProductBy(id);
        if(!data) {
            res.status(404).json({mensaje: 'Producto no encontrado'});
            return;
        }
        res.json(data);
    } catch(error) {
        res.status(500).json({mensaje: 'Error al buscar producto', error: error});
    }
}

const addProduct = async (req, res) => {
    try {
        const { producto } = req.body;
        if(!producto) {
            return res.status(400).json({mensaje: 'Faltan campos'});
        }
        const id = await productModel.addProduct({ producto });
        res.status(201).json({mensaje: 'Producto guardado', id});
    } catch(error) {
        res.status(500).json({mensaje: 'Error al guardar producto', error: error});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const producto = await productModel.getProductBy(id);
        if(!producto) {
            return res.status(404).json({mensaje: 'Producto no encontrado'});
        }
        await productModel.deleteProductById(id);
        res.json({mensaje: 'Producto eliminado', id});
    } catch(error) {
        res.status(500).json({mensaje: 'Error al eliminar producto', error: error});
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto } = req.body;
        if(!producto) {
            return res.status(400).json({mensaje: 'Faltan campos'});
        }
        const updated = await productModel.updateProductById(id, producto);
        if(!updated) {
            return res.status(404).json({mensaje: 'Producto no encontrado'});
        }
        res.status(200).json({mensaje: 'Producto actualizado', id});
    } catch(error) {
        res.status(500).json({mensaje: 'Error al actualizar producto', error: error});
    }
}

module.exports = {getProducts, getProductsId, addProduct, deleteProduct, updateProduct}
