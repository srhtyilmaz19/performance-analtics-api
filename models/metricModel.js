const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },
  fcp: {
    type: Number,
    required: true,
  },
  ttfb: {
    type: Number,
    required: true,
  },
  dom_load: {
    type: Number,
    required: true,
  },
  window_load: {
    type: Number,
    required: true,
  },
  resource_load: {
    type: Number,
  },
  files: {
    type: JSON,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});

const Metric = mongoose.model("Metric", metricSchema);

module.exports = Metric;
