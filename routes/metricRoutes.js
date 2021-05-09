const express = require("express");
const metricController = require("../controllers/metricController");
const getMetricsValidations = require("../requests/metrics/getMetricsValidations");
const createMetricsValidations = require("../requests/metrics/createMetricsValidations");
const router = express.Router();
const { checkSchema } = require("express-validator");

router.post(
  "/",
  checkSchema(getMetricsValidations),
  metricController.getMetrics
);
router.post(
  "/create",
  checkSchema(createMetricsValidations),
  metricController.createMetric
);

module.exports = router;
