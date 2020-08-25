const express = require("express");
const router = express.Router();
const TipoServico = require("../models/tipoServico");
const mongoose = require("mongoose");

//create tipo de servico
router.post("/", (req, res, next) => {
  const date = Date.now();
  const tipoServico = new TipoServico({
    idTipoServico: new mongoose.Types.ObjectId(),
    nomeServico: req.body.nomeServico,
    tipoServico: req.body.tipoServico,
    tipoPrestador: req.body.tipoServico,
    dateCreate: date.toString(),
  });

  tipoServico
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Tipo de serviço cadastrado com sucesso!",
        tipoServicoCriado: tipoServico,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//read tipo de servico
router.get("/", (req, res, next) => {
  const tipoServico = TipoServico.find({})
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "GET Request para /tipoServico",
        tipoServico: result,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

//read tipo de servico por id
router.get("/:tipoServicoId", (req, res, next) => {
  const id = req.params.tipoServicoId;
  TipoServico.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//update tipo de servico por id
router.put("/:tipoServicoId", (req, res, next) => {
  const idTipoServico = req.params.tipoServicoId;
  const cliente = req.params.body;
  TipoServico.findByIdAndUpdate(idTipoServico, req.body, { new: true })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "Tipo de Serviço atualizado com sucesso.",
        tipoServicoAtualizado: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//delete tipo de servico por id
router.delete("/:tipoServicoId", (req, res, next) => {
  const id = req.params.tipoServicoId;
  TipoServico.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res
        .status(200)
        .json({ message: "Tipo de Serviço excluído com sucesso." });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
