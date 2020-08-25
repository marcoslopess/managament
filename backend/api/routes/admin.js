const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const mongoose = require("mongoose");
const crypto = require("crypto");

//criando um cadastro
router.post("/", (req, res, next) => {
  const date = Date.now();
  const admin = new Admin({
    nomeAdmin: req.body.nomeAdmin,
    telefoneAdmin: req.body.telefoneAdmin,
    emailAdmin: req.body.emailAdmin,
    senhaAdmin: criptografar(req.body.senhaAdmin),
    dateCreate: date.toString(),
    admin: false
  });

  admin
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Administrador cadastrado com sucesso!",
        administradorCriado: admin,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//listando varios cadastro
router.get("/all", (req, res, next) => {
  const admin = Admin.find({})
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "GET Request para /admin",
        administradores: result,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

//listando um cadastro por id
router.get("/unique/:cadastroId", (req, res, next) => {
  const id = req.params.cadastroId;
  Admin.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//listando um cadastro por nome e senha
router.get("/usuario", (req, res, next) => {
  let email = req.headers.email;
  let senha = req.headers.senha;

  Admin.findOne({
    emailAdmin: email,
    senhaAdmin: senha,
  })
    .then((doc) => {
      if (doc === null) {
        res.status(200).json({ error: " Administrador não existe" });
      }
      res.status(200).json({
        message: "Seja bem vindo",
        admin: doc,
      });
    })
    .catch((err) => {
      res.status(200).json({ error: err });
    });
});

//atualizando um cadastro
router.put("/:cadastroId", (req, res, next) => {
  const id = req.params.cadastroId;
  const administrador = req.params.body;
  Admin.findByIdAndUpdate(id, req.body, { new: true })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "Administrador atualizado com sucesso.",
        administradorAtualizado: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//deletando um cadastro
router.delete("/:cadastroId", (req, res, next) => {
  const id = req.params.cadastroId;
  Admin.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({ message: "Cadastro excluído com sucesso." });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
