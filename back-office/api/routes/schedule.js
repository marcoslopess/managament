const express = require("express");
const router = express.Router();
const moment = require("moment");
var schedule = require("node-schedule");
var axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 6)];
rule.hour = process.env.HORA_SCHEDULE;
rule.minute = process.env.MINUTO_SCHEDULE;

var j = schedule.scheduleJob(rule, function () {
  let listEmails;

  const ip = process.env.URL_BACKEND;
  
  axios
     .get(`${ip}:4000/ordemServico/listEmails`)
    .then(function (response) {
      listEmails = response.data.list;
      listEmails.forEach(sendEmails);
    });

  function sendEmails(item, index, arr) {

    //DEFINIR O EMAIL E A SENHA DO GMAIL QUE VAI ENVIAR OS EMAILS
    const userMail = process.env.EMAIL_ENVIO;
    const passMail = process.env.SENHA_ENVIO;

    const sendCliente = require("gmail-send")({
      user: userMail,
      pass: passMail,
      to: arr[index].emailCliente,
      subject: "Lembrete de serviço agendado",
    });
    sendCliente(
      {
        text: `Olá ${
          arr[index].nomeCliente
        }, estamos passando aqui para lembrar que seu serviço está agendado para o dia ${moment(
          arr[index].dataServico
        ).format("DD/MM/YYYY")} às ${moment(arr[index].dataServico).format(
          "LT"
        )}!`,
      },
      (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
      }
    );

    const sendPrestador = require("gmail-send")({
      user: userMail,
      pass: passMail,
      to: arr[index].emailPrestador,
      subject: "Lembrete de serviço",
    });
    sendPrestador(
      {
        text: `Olá ${
          arr[index].nomePrestador
        }, estamos passando aqui para lembrar que você tem um serviço agendado!\n
        Dia: ${moment(arr[index].dataServico).format("DD/MM/YYYY")} \n
        Hora: ${moment(arr[index].dataServico).format("LT")} \n 
        Descrição:  ${arr[index].descricaoOrdemServico} \n
        `,
      },
      (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
      }
    );
  }
});

module.exports = router;
