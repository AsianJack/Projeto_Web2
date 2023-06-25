const { ObjectId } = require('mongodb');
class pastelModel {
    constructor(connection) {
        this.connection = connection;
        this.collection = this.connection.database.collection("Pastels");
    }

    async createPastel(Pastel) {
        try {
            Pastel.timestamp = new Date(); // Adiciona o timestamp atual
            const result = await this.collection.insertOne(Pastel);
            console.log('Pastel criado:', result.insertedId);
        } catch (error) {
            console.error('Erro ao criar o Pastel:', error);
        }
    }

    async readPasteis() {
        try {
            const Pastels = await this.collection.find().toArray();
            return(Pastels)
        } catch (error) {
            console.error('Erro ao ler os Pastels:', error);
        }
    }

   async updatePastel(PastelId, novoPastel) {
        try {
            
            const query = { _id: new ObjectId(PastelId) };
            const update = { $set: novoPastel };
            const result = await this.collection.updateOne(query, update);
        } catch (error) {
            console.error('Erro ao atualizar o Pastel:', error);
            throw error;
        }
    }

    async deletePastel(PastelId) {
        try {
            const result = await this.collection.deleteOne({ _id: PastelId });
            console.log('Pastel removido:', result.deletedCount);
        } catch (error) {
            console.error('Erro ao remover o Pastel:', error);
        }
    }

    async findOne(query) {
        try {
            const result = await this.collection.findOne({_id : query});
            return (result);
        } catch (error) {
            console.error('Erro ao buscar', error);
        }
    }

    async findOnenome(query) {
        try {
            const result = await this.collection.findOne({nome : query});
            return (result);
        } catch (error) {
            console.error('Erro ao buscar', error);
        }
    }
}

module.exports = pastelModel;
