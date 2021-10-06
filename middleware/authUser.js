// const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authenticated Failed");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to the journal routes
    req.user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
    };
    next();
  } catch (error) {
    throw new Error("Authentication failed");
  }
};

module.exports = authUser;
