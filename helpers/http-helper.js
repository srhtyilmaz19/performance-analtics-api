exports.returnJsonResponse = (res, data, status = 200, message = "") => {
  res.status(status).json({
    message: formatErrorMessages(status, message),
    status,
    data,
  });
};

function formatErrorMessages(status, key) {
  if (status === 200) {
    return key;
  }

  return {
    error: `${key} ${
      status === 400 ? "field can not be null" : "field type mismatch"
    }`,
  };
}
