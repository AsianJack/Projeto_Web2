const DBConnection = require('../models/banco_de_dados');
const pastelModel = require('../models/pastelModel.js');

class pastelController {
  constructor() {
    this.connection = new DBConnection();
    this.model = null;
  }

  async createPastel(Pastel) {
    try {
      await this.connection.connect();
      this.model = new pastelModel(this.connection);
      await this.model.createPastel(Pastel);
    } finally {
      this.connection.close();
    }
  }

  async readPasteis() {
    try {
      await this.connection.connect();
      this.model = new pastelModel(this.connection);
      return (await this.model.readPasteis());
    } finally {
      await this.connection.close();
    }
  }

  async updatePastel(PastelId, novoPastel) {
    try {
      await this.connection.connect();
      this.model = new pastelModel(this.connection);
      await this.model.updatePastel(PastelId, novoPastel);
    } finally {
      this.connection.close();
    }
  }

  async deletePastel(filter) {
    try {
      await this.connection.connect();
      this.model = new pastelModel(this.connection);
      await this.model.deletePastel(filter);
    } finally {
      this.connection.close();
    }
  }

  async findOne(query) {
    try {
      await this.connection.connect();
      this.model = new pastelModel(this.connection);
      return await this.model.findOne(query);
    } finally {
      this.connection.close();
    }
  }

  async findOnenome(query) {
    try {
      await this.connection.connect();
      this.model = new pastelModel(this.connection);
      return await this.model.findOnenome(query);
    } finally {
      this.connection.close();
    }
  }
}

module.exports = pastelController;
