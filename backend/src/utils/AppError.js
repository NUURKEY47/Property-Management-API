// utils/AppError.js

class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.details = details;

    // Keep correct stack trace (V8 engine)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
