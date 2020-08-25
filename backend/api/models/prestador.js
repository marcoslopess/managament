const mongoose = require("mongoose");

const prestadorSchema = mongoose.Schema({
  nomePrestador: String,
  telefonePrestador: String,
  emailPrestador: String,
  dateCreate: { type: Date },
  dateUpdate: { type: Date },
});

module.exports = mongoose.model("Prestador", prestadorSchema);
