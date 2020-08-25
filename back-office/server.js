const http = require("http");
const ip = require("ip");
const app = require("./app");

let ipServidor = ip.address();

const port = 5000;

const server = http.createServer(app);

server.listen(process.env.PORT || port);
//port, ipServidor, () => console.log(`Servidor funcionando em ${ipServidor}:${port}`))

//
// console.log(server);
