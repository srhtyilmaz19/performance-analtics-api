const { returnJsonResponse } = require("../helpers/http-helper");
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
  client.get(req.cacheKey, async (err, cachedData) => {
    if (cachedData) {
      return returnJsonResponse(
        res,
        JSON.parse(cachedData),
        200,
        getMetricsSuccess
      );
    }
    MetricInteractor.getMetrics({
      domain: req.body.domain,
      startDate: req.startDate,
      endDate: req.endDate,
    })
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
  MetricInteractor.saveMetric({ ...req.body, timestamp: req.timestamp })
    .then(function (metric) {
      return returnJsonResponse(res, metric, 200, saveMetricSuccess);
    })
    .catch(function (error) {
      return returnJsonResponse(res, null, 404, error);
    });
};
