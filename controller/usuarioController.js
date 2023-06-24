const DBConnection = require('../models/banco_de_dados');
const UsuarioModel = require('../models/usuarioModel');

class UsuarioController {
  constructor() {
    this.connection = new DBConnection();
    this.model = null;
  }

  async createUsuario(Usuario) {
    try {
      await this.connection.connect();
      this.model = new UsuarioModel(this.connection);
      await this.model.createUsuario(Usuario);
    } finally {
      this.connection.close();
    }
  }

  async readUsuarios() {
    try {
      await this.connection.connect();
      this.model = new UsuarioModel(this.connection);
      return(await this.model.readUsuarios());
    } finally {
      this.connection.close();
    }
  }

  async updateUsuario(filter, update) {
    try {
      await this.connection.connect();
      this.model = new UsuarioModel(this.connection);
      await this.model.updateUsuario(filter, update);
    } finally {
      this.connection.close();
    }
  }

  async deleteUsuario(filter) {
    try {
      await this.connection.connect();
      this.model = new UsuarioModel(this.connection);
      await this.model.deleteUsuario(filter);
    } finally {
      this.connection.close();
    }
  }

  async findOne(query) {
    try {
      await this.connection.connect();
      this.model = new UsuarioModel(this.connection);
      return await this.model.findOne(query);
    } finally {
      this.connection.close();
    }
  }
}

module.exports = UsuarioController;
