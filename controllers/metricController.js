const Metric = require("../models/metricModel");
const { returnJsonResponse } = require("../traits/httpTrait");
const { validationResult } = require("express-validator");
const redis = require("redis");

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

let metricInteractor = require("../interactors/metrics-interactos");
const MetricInteractor = new metricInteractor();

const getMetricsSuccess = "metrics retrieved successfully";
const saveMetricSuccess = "metric created successfully";

exports.getMetrics = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return returnJsonResponse(res, null, 400, errors.array());
  }

  const instance = {
    domain: req.body.domain,
    startDate: req.startDate,
    endDate: req.endDate,
  };

  client.get(req.cacheKey, async (err, cachedData) => {
    if (cachedData) {
      return returnJsonResponse(
        res,
        JSON.parse(cachedData),
        200,
        getMetricsSuccess
      );
    }
    MetricInteractor.getMetrics(instance)
      .then(function (metrics) {
        client.setex(req.cacheKey, 5 * 1000, JSON.stringify(metrics));
        return returnJsonResponse(res, metrics, 200, getMetricsSuccess);
      })
      .catch(function (error) {
        return returnJsonResponse(res, null, 404, error);
      });
  });
};

exports.createMetric = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return returnJsonResponse(res, null, 400, errors.array());
  }

  MetricInteractor.saveMetric({ ...req.body, timestamp: req.timestamp })
    .then(function (metric) {
      return returnJsonResponse(res, metric, 200, saveMetricSuccess);
    })
    .catch(function (error) {
      return returnJsonResponse(res, null, 404, error);
    });
};
