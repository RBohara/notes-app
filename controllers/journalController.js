const Journal = require("../models/journalModel");
const { StatusCodes } = require("http-status-codes");

const createJournal = async (req, res) => {
  const { userId } = req.user;
  req.body.createdBy = userId;

  await Journal.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Journal Created Successfully" });
};

const getAllJournals = async (req, res) => {
  const { userId } = req.user;
  const journals = await Journal.find({ createdBy: userId }).sort("-createdAt");
  res.status(StatusCodes.OK).json(journals);
};

const getJournal = async (req, res) => {
  const {
    user: { userId },
    params: { id: journalId },
  } = req;
  const journal = await Journal.findOne({ _id: journalId, createdBy: userId });
  if (!journal) {
    throw new Error("No journal found");
  }
  res.status(StatusCodes.OK).json(journal);
};

const updateJournal = async (req, res) => {
  const {
    body: { title, description },
    user: { userId },
    params: { id: journalId },
  } = req;

  if (title === "" || description === "") {
    throw new Error("Title or description cannot be empty");
  }

  const journal = await Journal.findByIdAndUpdate(
    { _id: journalId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!journal) {
    throw new Error("No such journal was found");
  }
  res.status(StatusCodes.OK).json({ msg: "Successfully Updated Journal" });
};

const deleteJournal = async (req, res) => {
  const {
    user: { userId },
    params: { id: journalId },
  } = req;

  const journal = await Journal.findByIdAndRemove({
    _id: journalId,
    createdBy: userId,
  });

  if (!journal) {
    throw new Error("No such journal was found");
  }
  res.status(StatusCodes.OK).json({ msg: "Journal successfully deleted" });
};

module.exports = {
  createJournal,
  getAllJournals,
  getJournal,
  updateJournal,
  deleteJournal,
};
