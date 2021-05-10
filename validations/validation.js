"use strict";

class Validation {
  constructor() {
    // If you need to do any initializations in future.
  }

  validateInputs(req, res, next) {
    return new Error("Any subclass needs to implement this method");
  }
}

module.exports = Validation;
