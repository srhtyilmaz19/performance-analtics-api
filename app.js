const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const metricRouter = require("./routes/metricRoutes");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  req.timestamp = Math.floor(Date.now() / 1000);
  next();
});
app.use(cors());

// ROUTES
app.use("/api/v1/metrics", metricRouter);

module.exports = app;
