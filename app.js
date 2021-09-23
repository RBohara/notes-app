require("dotenv").config();
const path = require("path");

const cors = require("cors");

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

//routers
const userRouter = require("./routes/userRoute");
const journalRouter = require("./routes/journalRoute");

const express = require("express");

const app = express();

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// routes
app.use("/api/users", userRouter);
app.use("/api/journals", authenticateUser, journalRouter);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
