const express = require("express");
const app = express();
const morgan = require("morgan");
const bookRouter = require("./routes/books");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware");
const sendEmail = require("./helpers/sendEmail");

const mongoURL =
  "mongodb+srv://kyawzintun:test1234@mernprojectcluter2.41jzm.mongodb.net/?retryWrites=true&w=majority&appName=mernProjectCluter2";

mongoose.connect(mongoURL).then(() => {
  console.log("connected database");

  app.listen(process.env.PORT, (req, res) => {
    console.log("app is running localhost:" + process.env.PORT);
  });
});

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.json({ msg: "hello world" });
});

app.use("/api/books", authMiddleware, bookRouter);
app.use(userRouter);

app.get("/send-email", async (req, res) => {
  try {
    await sendEmail({
      view: "email",
      from: "mgmg@gmail.com",
      to: "aungaung@gmail.com",
      subject: "New updates are ready for you",
    });

    return res.send("email already send");
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
