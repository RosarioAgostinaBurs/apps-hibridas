const express = require('express');
const router = express.Router();
const {getProducts, getProductsId, addProduct, deleteProduct, updateProduct} = require('../controllers/productController');

router.get('/', getProducts);

router.get('/:id', getProductsId);

router.post('/', addProduct);


router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);

module.exports = router;