const express = require("express");
const router = express.Router();
const OrdemServico = require("../models/ordemServico");
const mongoose = require("mongoose");
const moment = require("moment");

//create ordem de serviço
router.post("/", (req, res, next) => {
  const date = Date.now();
  const ordemServico = new OrdemServico({
    idCliente: new mongoose.Types.ObjectId(),
    //cliente
    nomeCliente: req.body.nomeCliente,
    telefoneCliente: req.body.telefoneCliente,
    emailCliente: req.body.emailCliente,
    enderecoCliente: req.body.enderecoCliente,
    cidadeCliente: req.body.cidadeCliente,
    estadoCliente: req.body.estadoCliente,
    //prestador
    nomePrestador: req.body.nomePrestador,
    telefonePrestador: req.body.telefonePrestador,
    emailPrestador: req.body.emailPrestador,
    //tipo de serviço
    nomeServico: req.body.nomeServico,
    tipoServico: req.body.tipoServico,
    tipoPrestador: req.body.tipoPrestador,
    //ordem de serviço
    descricaoOrdemServico: req.body.descricaoOrdemServico,
    dataServico: req.body.dataServico,
    horaServico: req.body.horaServico,
    precoOrdemServico: req.body.precoOrdemServico,
    frequencia: req.body.frequencia,
    formaPagamento: req.body.formaPagamento,
    dataProx: req.body.dataProx,
    dateSchedule: req.body.dateSchedule,
    confirmado: false,
    ocioso: true,
    dateCreate: date.toString(),
  });

  ordemServico
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Ordem de Serviço cadastrada com sucesso",
        OSCriado: ordemServico,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});



//read ordem de serviço
router.get("/", (req, res, next) => {
  const ordemServico = OrdemServico.find({})
    .sort({ dataServico: "asc" })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "GET Request para /ordemServico",
        servicos: result,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

//read ordem de serviço
router.get("/ociosos", (req, res, next) => {
  const ociosos = OrdemServico.find({})
    .sort({ dataServico: "asc" })
     //.where({ ocioso: true })
    .lt("dataProx", Date())
    .exec()
    .then((resultado) => {
      res.status(200).json({
        message: "GET Request para /ordemServico",
        ociosos: resultado,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error,
      })
    );
});

router.get("/agendados", (req, res, next) => {
  const ociosos = OrdemServico.find({})
    .sort({ dataServico: "asc" })
    .where({ confirmado: false })
    .exec()
    .then((resultado) => {
      res.status(200).json({
        message: "GET Request para /ordemServico",
        agendados: resultado,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error,
      })
    );
});

router.get("/feitos", (req, res, next) => {
  const ociosos = OrdemServico.find({})
    .sort({ dataServico: "asc" })
    .where({ confirmado: true })
    .exec()
    .then((resultado) => {
      res.status(200).json({
        message: "GET Request para /ordemServico",
        feitos: resultado,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error,
      })
    );
});
 
let day = moment();
day = moment(day).format("YYYY-MM-DD");

router.get("/listEmails", (req, res, next) => {
  const ociosos = OrdemServico.find({})
    // .sort({ dataServico: "asc" })
    .where("dateSchedule", day)
    .exec()
    .then((resultado) => {
      console.log(day);
      
      res.status(200).json({
        message: "Listagem de todos os serviços marcados para o proximo dia",
        list: resultado,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error,
      })
    );
});

//read ordem de serviço por id
router.get("/:ordemServicoId", (req, res, next) => {
  const id = req.params.ordemServicoId;
  OrdemServico.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});



//update ordem de serviço por id
router.put("/:ordemServicoId", (req, res, next) => {
  const idOrdemServico = req.params.ordemServicoId;
  const ordemServico = req.params.body;
  OrdemServico.findByIdAndUpdate(idOrdemServico, req.body, { new: true })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "Ordem de serviço atualizado com sucesso.",
        ordemServicoAtualizado: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//delete ordem de serviço por id
router.delete("/:ordemServicoId", (req, res, next) => {
  const id = req.params.ordemServicoId;
  OrdemServico.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res
        .status(200)
        .json({ message: "Ordem de serviço excluído com sucesso." });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
