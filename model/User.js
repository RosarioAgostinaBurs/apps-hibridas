const { error } = require('console');
const fs = require('fs/promises');

class User {
        users = [];
        path = './data/users.json';

    constructor(users = []) {
        this.users = users;
    }

    async leerUsers() {
        try {
            const data = await fs.readFile(this.path);
            this.users = JSON.parse(data);
        } catch(error) {
            this.users = [];
        }
    }

    async guardarUser() {
        try {
            const data = JSON.stringify(this.users, null, 2);
            await fs.writeFile(this.path, data);
        } catch(error) {
            console.error('Error al momento de guardar los usuarios: ', error);
        }
    }

    async addUsers(user) {
        try {
            await this.leerUsers();
    
            const id = crypto.randomUUID();
            this.users.push({
                id: id,
                nombre: user.nombre,
                email: user.email,
                password: user.password
            });
    
            await this.guardarUser();
            return id;

        } catch(error) {
            console.error('Error al momento de agregar el usuario: ', error);
        }
    }

    async getUsers() {
        await this.leerUsers();
        return this.users;
    }

}

module.exports = User;