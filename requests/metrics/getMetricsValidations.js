const getMetricsSchema = {
  domain: {
    notEmpty: true,
    errorMessage: "Domain field can not be null",
  },
};

module.exports = getMetricsSchema;
