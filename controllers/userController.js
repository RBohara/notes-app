const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "No such user" });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid Credentials" });
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
