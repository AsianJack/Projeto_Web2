class usuarioDAO {
    constructor(connection) {
        this.connection = connection;
        this.collection = this.connection.database.collection("usuarios");
    }

    async createusuario(usuario) {
        try {
            usuario.timestamp = new Date();
            const result = await this.collection.insertOne(usuario);
            console.log('usuario criado:', result.insertedId);
        } catch (error) {
            console.error('Erro ao criar o usuario:', error);
        }
    }

    async readusuarios() {
        try {
            const usuarios = await this.collection.find().toArray();
            console.log('usuarios encontrados:', usuarios);
            return(usuarios)
        } catch (error) {
            console.error('Erro ao ler os usuarios:', error);
        }
    }

    async updateusuario(filter, update) {
        try {
            const result = await this.collection.updateOne(filter, update);
            console.log('usuario atualizado:', result.modifiedCount);
        } catch (error) {
            console.error('Erro ao atualizar o usuario:', error);
        }
    }

    async deleteusuario(filter) {
        try {
            const result = await this.collection.deleteOne(filter);
            console.log('usuario removido:', result.deletedCount);
        } catch (error) {
            console.error('Erro ao remover o usuario:', error);
        }
    }

    async findOne(query) {
        try {
            const result = await this.collection.findOne(query);
            return (result);
        } catch (error) {
            console.error('Erro ao logar', error);
        }
      }

}

module.exports = usuarioDAO;
