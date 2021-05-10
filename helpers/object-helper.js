exports.checkIfPropIsValid = function (obj, prp) {
  if (!(prp.key in obj) && !obj[prp.key]) {
    return {
      value: false,
      status: 400,
    };
  }
  if (typeof obj[prp.key] !== prp.type) {
    return {
      value: false,
      status: 422,
    };
  }
  return {
    value: true,
    status: 200,
  };
};
