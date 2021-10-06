const Note = require("../models/notesModel");
const { StatusCodes } = require("http-status-codes");

const createNote = async (req, res) => {
  const { userId } = req.user;
  req.body.createdBy = userId;

  await Note.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Note Created Successfully" });
};

const getAllNotes = async (req, res) => {
  const { userId } = req.user;
  const notes = await Note.find({ createdBy: userId }).sort("-createdAt");
  res.status(StatusCodes.OK).json(notes);
};

const getNote = async (req, res) => {
  const {
    user: { userId },
    params: { id: journalId },
  } = req;
  const note = await Note.findOne({ _id: journalId, createdBy: userId });
  if (!note) {
    throw new Error("No note found");
  }
  res.status(StatusCodes.OK).json(note);
};

const updateNote = async (req, res) => {
  const {
    body: { title, description },
    user: { userId },
    params: { id: journalId },
  } = req;

  if (title === "" || description === "") {
    throw new Error("Title or description cannot be empty");
  }

  const note = await Note.findByIdAndUpdate(
    { _id: journalId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!note) {
    throw new Error("No such note was found");
  }
  res.status(StatusCodes.OK).json({ msg: "Successfully Updated Journal" });
};

const deleteNote = async (req, res) => {
  const {
    user: { userId },
    params: { id: journalId },
  } = req;

  const note = await Note.findByIdAndRemove({
    _id: journalId,
    createdBy: userId,
  });

  if (!note) {
    throw new Error("No such note was found");
  }
  res.status(StatusCodes.OK).json({ msg: "Note successfully deleted" });
};

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
};
