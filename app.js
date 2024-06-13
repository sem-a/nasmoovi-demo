const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", require("./routes/users"));
app.use("/api/wedding", require("./routes/wedding"));
app.use("/api/portfolio", require("./routes/portfolio"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/video", require("./routes/video"));

app.use((req, res, next) => {
  const userAgent = req.headers["user-agent"];

  if (userAgent.includes("Yandex")) {
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "build", "200.html"));
    });
    // const htmlCopy = fs.readFileSync("build/200.html", "utf8");
    // res.send(htmlCopy);
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

module.exports = app;
