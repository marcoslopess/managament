const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const clienteRoutes = require("./api/routes/cliente");
const ordemServicoRoutes = require("./api/routes/ordemServico");
const prestadorRoutes = require("./api/routes/prestador");
const tipoServicoRoutes = require("./api/routes/tipoServico");
const adminRoutes = require("./api/routes/admin");
const authRoutes = require("./api/routes/auth");
const loginRoutes = require("./api/routes/login");

//CONECTANDO AO MONGODB ATLAS
mongoose.connect(
  process.env.URL_MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (res.method == "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,DELETE,OPTIONS");
    return res.status(200).json({});
  }
  next();
});

app.use("/cliente", clienteRoutes);
app.use("/ordemServico", ordemServicoRoutes);
app.use("/prestador", prestadorRoutes);
app.use("/tipoServico", tipoServicoRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/login", loginRoutes);

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
