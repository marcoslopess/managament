const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const scheduleRoutes = require("./api/routes/schedule");

mongoose.connect(
  "mongodb+srv://devel_lopes:82008456ml@cluster0-4rbrc.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

app.use("/schedule", scheduleRoutes);

app.use((req, res, next) => {
  const error = new Error("404 page");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    schedule: {
      message: "page index schedule",
    },
  });
});

module.exports = app;
