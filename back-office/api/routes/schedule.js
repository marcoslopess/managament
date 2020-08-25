const express = require("express");
const router = express.Router();
const moment = require("moment");
var schedule = require("node-schedule");
var axios = require("axios");

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 6)];
//DEFINIR A HORA QUE VAI SER EXECUTADO O SCHEDULE
rule.hour = 22;
rule.minute = 57;
console.log(rule);
var j = schedule.scheduleJob(rule, function () {
  let listEmails;

  //DEFINIR O IP DO BACKEND
  const ip = 'IP DO BACKEND';
  
  axios
     .get(`${ip}:4000/ordemServico/listEmails`)
    .then(function (response) {
      listEmails = response.data.list;
      listEmails.forEach(sendEmails);
    });

  function sendEmails(item, index, arr) {

    //DEFINIR O EMAIL E A SENHA DO GMAIL QUE VAI ENVIAR OS EMAILS
    const userMail = "SEU EMAIL";
    const passMail = "SUA SENHA";

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
