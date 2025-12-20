const sendResponse = (
  res,
  { statusCode = 200, success = true, message = "", data = null, meta = null }
) => {
  const response = {
    success,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

export default sendResponse;
