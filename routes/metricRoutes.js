const express = require("express");
const metricController = require("../controllers/metricController");
const router = express.Router();

const metricValidation = require("../validations/metric-validations");
const MetricValidation = new metricValidation();

router.post(
  "/",
  MetricValidation.validateGetMetrics,
  metricController.getMetrics
);
router.post(
  "/create",
  MetricValidation.validateStoreMetrics,
  metricController.storeMetric
);

module.exports = router;
