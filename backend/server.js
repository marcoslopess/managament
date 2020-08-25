const http = require("http");
const ip = require("ip");
const app = require("./app");

let ipServidor = ip.address();

const port = 4000;

const server = http.createServer(app);

// server.listen(process.env.PORT || port);
 server.listen(port, ipServidor, () => console.log(`Servidor funcionando em ${ipServidor}:${port}`))
