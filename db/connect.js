const mongoose = require("mongoose");

const connectDB = async (url) => {
  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

module.exports = connectDB;
