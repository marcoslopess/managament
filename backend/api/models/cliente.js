const mongoose = require("mongoose");

const clienteSchema = mongoose.Schema({
  nomeCliente: String,
  emailCliente: String,
  telefoneCliente: String,
  enderecoCliente: String,
  cidadeCliente: String,
  estadoCliente: String,
  ocioso: String,
  dateCreate: { type: Date },
  dateUpdate: { type: Date },
});

module.exports = mongoose.model("Cliente", clienteSchema);
