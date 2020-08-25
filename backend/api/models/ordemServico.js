const mongoose = require("mongoose");

const ordemServicoSchema = mongoose.Schema({
  //cliente
  nomeCliente: String,
  telefoneCliente: String,
  enderecoCliente: String,
  emailCliente: String,
  cidadeCliente: String,
  estadoCliente: String,
  //prestador
  nomePrestador: String,
  telefonePrestador: String,
  emailPrestador: String,
  //tipo de serviço
  nomeServico: String,
  tipoServico: String,
  tipoPrestador: String,
  //ordem de serviço
  descricaoOrdemServico: String,
  dataServico: { type: Date },
  horaServico: String,
  precoOrdemServico: String,
  tempoPrevisto: String,
  frequencia: String,
  formaPagamento: String,
  confirmado: Boolean,
  dataProx: { type: Date },
  dateCreate: { type: Date },
  dateUpdate: { type: Date },
  dateSchedule: String,
  dataFimServico: String,
  horaInicioServico: String,
  horaFimServico: String,
  ocioso: Boolean
});

module.exports = mongoose.model("OrdemServico", ordemServicoSchema);
