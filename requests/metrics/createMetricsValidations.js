const createMetricsValidations = {
  domain: {
    notEmpty: true,
    errorMessage: "Domain field can not be null",
  },

  fcp: {
    notEmpty: true,
    errorMessage: "fcp field can not be null",
  },

  ttfb: {
    notEmpty: true,
    errorMessage: "ttfb field can not be null",
  },

  window_load: {
    notEmpty: true,
    errorMessage: "window_load field can not be null",
  },

  dom_load: {
    notEmpty: true,
    errorMessage: "dom_load field can not be null",
  },

  resource_load: {
    notEmpty: true,
    errorMessage: "resource_load field can not be null",
  },

  // files: req.body.files,
};

module.exports = createMetricsValidations;
