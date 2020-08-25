const express = require("express");
const router = express.Router();
const Cliente = require("../models/cliente");
const mongoose = require("mongoose");

//create cliente
router.post("/", (req, res, next) => {
  const date = Date.now();
  const cliente = new Cliente({
    idCliente: new mongoose.Types.ObjectId(),
    emailCliente: req.body.emailCliente,
    nomeCliente: req.body.nomeCliente,
    telefoneCliente: req.body.telefoneCliente,
    enderecoCliente: req.body.enderecoCliente,
    cidadeCliente: req.body.cidadeCliente,
    estadoCliente: req.body.estadoCliente,
    dateCreate: date.toString(),
  });

  cliente
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Cliente cadastrado com sucesso",
        clienteCriado: cliente,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//read cliente
router.get("/", (req, res, next) => {
  const cliente = Cliente.find({})
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "GET Request para /cliente",
        cliente: result,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

//read cliente por id
router.get("/:clienteId", (req, res, next) => {
  const id = req.params.clienteId;
  Cliente.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//update cliente por id
router.put("/:clienteId", (req, res, next) => {
  const idCliente = req.params.clienteId;
  const cliente = req.params.body;

  Cliente.findByIdAndUpdate(idCliente, req.body, { new: true })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "Cliente atualizado com sucesso.",
        clienteAtualizado: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//delete cliente por id
router.delete("/:clienteId", (req, res, next) => {
  const id = req.params.clienteId;
  Cliente.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({ message: "Cliente excluído com sucesso." });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
