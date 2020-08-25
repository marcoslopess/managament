const mongoose = require("mongoose");

const tipoServicoSchema = mongoose.Schema({
  nomeServico: String,
  tipoServico: String,
  tipoPrestador: String,
  dateCreate: { type: Date },
  dateUpdate: { type: Date },
});

module.exports = mongoose.model("tipoServico", tipoServicoSchema);
