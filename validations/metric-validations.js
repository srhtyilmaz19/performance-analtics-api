"use strict";
const { returnJsonResponse } = require("../traits/httpTrait");
const { checkIfPropIsValid } = require("../helpers/object-helper");

class MetricValidation {
  validateGetMetrics(req, res, next) {
    const { domain } = req.body;

    if (!domain) {
      return returnJsonResponse(res, null, 400, "Domain");
    }

    next();
  }

  validateStoreMetrics(req, res, next) {
    const requiredParams = [
      {
        key: "domain",
        type: "string",
      },
      {
        key: "fcp",
        type: "number",
      },
      {
        key: "ttfb",
        type: "number",
      },
      {
        key: "window_load",
        type: "number",
      },
      {
        key: "dom_load",
        type: "number",
      },
      {
        key: "resource_load",
        type: "number",
      },
    ];

    requiredParams.forEach((element) => {
      const valid = checkIfPropIsValid(req.body, element);
      if (!valid.value) {
        return returnJsonResponse(res, null, valid.status, element.key);
      }
    });

    next();
  }
}
module.exports = MetricValidation;
