const DBConnection = require('../models/banco_de_dados');
const PedidoModel = require('../models/pedidos_pastelModel');

class PedidoController {
    constructor() {
        this.connection = new DBConnection();
        this.model = null;
    }

    async createPedido(pedido) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.createPedido(pedido);
        } finally {
            this.connection.close();
        }
    }

    async readPedidos(UID) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            return (await this.model.readPedidos(UID));
        } finally {
            this.connection.close();
        }
    }

    async updatePedido(pedidoId, novoPedido) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.updatePedido(pedidoId, novoPedido);
        } finally {
            this.connection.close();
        }
    }

    async updatePedidoPastel(nome, novoPastel) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.updatePedidoPastel(nome, novoPastel);
        } finally {
            this.connection.close();
        }
    }

    async deletePedido(filter) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.deletePedido(filter);
        } finally {
            this.connection.close();
        }
    }

    async deletePedidoMany(nome) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.deletePedidoMany(nome);
        } finally {
            this.connection.close();
        }
    }

    async findOne(query) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            return await this.model.findOne(query);
        } finally {
            this.connection.close();
        }
    }
}

module.exports = PedidoController;
