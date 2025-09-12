const fs = require('fs/promises');
const crypto = require("crypto");

class ProductManager {
    products = [];
    path = "data/productos.json";

    constructor(products=[]) {
        this.products = products;
    }

    async leerProducts() {
        try {
            const data = await fs.readFile(this.path);
            this.products = JSON.parse(data);
        } catch {
            this.products = [];
        }
    }

    async guardarProduct() {
        const data = JSON.stringify(this.products, null, 2);
        await fs.writeFile(this.path, data);
    }

    async addProduct(producto) {
        await this.leerProducts();

        const id = crypto.randomUUID();
        this.products.push({
            id: id,
            producto: producto.producto
        });

        await this.guardarProduct();
        return id;
    }

    async getProducts() {
        await this.leerProducts();
        return this.products;
    }

    async getProductBy(id) {
        await this.leerProducts();
        const producto = this.products.find((p) => p.id === id);
        if(!producto) {
            console.log('Not found');
            return null;
        } 
        return producto;
    }

    async deleteProductById(id) {
        await this.leerProducts();
        const prod = this.products.findIndex(p => p.id == id);
        if(prod == -1) {
            return console.log('Not found product');
        } else {
            this.products.splice(prod, 1);
            await this.guardarProduct();
            return id;
        }
    }

    async updateProductById(id, producto) {
        await this.leerProducts();
        const prod = this.products.findIndex(p => p.id == id);
        if(prod == -1) {
            return 'Not found product(update)';
        }
        const actualizado = {id: id, producto: producto};
        this.products.splice(prod, 1, actualizado);
        await this.guardarProduct();
        return `Actualizado ${id}`;
    }
}

module.exports = ProductManager;