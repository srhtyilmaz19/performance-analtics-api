const Metric = require("../models/metricModel");
const { returnJsonResponse } = require("../traits/httpTrait");
const { validationResult } = require("express-validator");
const redis = require("redis");

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const successMessage = "metrics retrieved successfully";

exports.getMetrics = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return returnJsonResponse(res, null, 400, errors.array());
  }

  const startDate = req.body.start_date || req.timestamp - 30 * 60;
  const endDate = req.body.end_date || req.timestamp;

  const cacheKey = `get-metrics-between-${startDate}-${endDate}`;

  client.get(cacheKey, async (err, data) => {
    if (data) {
      return returnJsonResponse(res, JSON.parse(data), 200, successMessage);
    }

    try {
      const metrics = await Metric.find({
        domain: req.body.domain,
        timestamp: {
          $gte: startDate,
          $lte: endDate,
        },
      }).sort("timestamp");

      const data = {
        startDate,
        endDate,
        metrics,
      };

      client.setex(cacheKey, 5 * 1000, JSON.stringify(data));

      return returnJsonResponse(res, data, 200, successMessage);
    } catch (e) {
      return returnJsonResponse(res, null, 404, e);
    }
  });
};

exports.createMetric = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return returnJsonResponse(res, null, 400, errors.array());
  }

  const newMetric = await Metric.create({
    domain: req.body.domain,
    fcp: req.body.fcp,
    ttfb: req.body.ttfb,
    dom_load: req.body.dom_load,
    window_load: req.body.window_load,
    files: req.body.files || [],
    resource_load: req.body.resource_load,
    timestamp: req.timestamp,
  });

  res.status(200).json({
    message: "metrics created successfully",
    data: newMetric,
    status: 200,
  });
};
