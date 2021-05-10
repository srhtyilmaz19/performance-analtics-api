"use strict";
const Metric = require("../models/metricModel");

class MetricInteractor {
  getMetrics(instance) {
    const { domain, startDate, endDate } = instance;

    return new Promise(
      (resolve) => {
        return Metric.find({
          domain: domain,
          timestamp: {
            $gte: startDate,
            $lte: endDate,
          },
        })
          .sort("timestamp")
          .exec()
          .then((metrics) => {
            resolve({ ...instance, metrics });
          });
      },
      (reject) => {
        reject("an error occured");
      }
    );
  }

  saveMetric(request) {
    return new Promise(
      (resolve) => {
        return Metric.create(request, function (err, metric) {
          resolve(metric);
        });
      },
      (reject) => {
        reject("an error occured");
      }
    );
  }
}

module.exports = MetricInteractor;
