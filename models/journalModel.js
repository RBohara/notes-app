const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: [true, "Please provide the title"],
    },
    description: {
      type: String,
      default: [true, "Please provide the description"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
