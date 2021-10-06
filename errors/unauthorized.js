const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api-error");

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCoded = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
