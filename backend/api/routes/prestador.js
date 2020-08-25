const express = require("express");
const router = express.Router();
const Prestador = require("../models/prestador");
const mongoose = require("mongoose");

//create prestador
router.post("/", (req, res, next) => {
  const date = Date.now();
  const prestador = new Prestador({
    idPrestador: new mongoose.Types.ObjectId(),
    nomePrestador: req.body.nomePrestador,
    telefonePrestador: req.body.telefonePrestador,
    emailPrestador: req.body.emailPrestador,
    dateCreate: date.toString(),
  });

  prestador
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Prestador cadastrado com sucesso!",
        prestadorCriado: prestador,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//read prestador
router.get("/", (req, res, next) => {
  const prestador = Prestador.find({})
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "GET Request para /prestador",
        prestador: result,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

//read prestador por id
router.get("/:prestadorId", (req, res, next) => {
  const id = req.params.prestadorId;
  Prestador.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//update prestador por id
router.put("/:prestadorId", (req, res, next) => {
  const idPrestador = req.params.prestadorId;
  const prestador = req.params.body;
  Prestador.findByIdAndUpdate(idPrestador, req.body, { new: true })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "Prestador atualizado com sucesso.",
        prestadorAtualizado: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//delete prestador por id
router.delete("/:prestadorId", (req, res, next) => {
  const id = req.params.prestadorId;
  Prestador.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({ message: "Prestador excluído com sucesso." });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
