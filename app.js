const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({ origin: 'https://sem-a-nasmoovi-demo-bad7.twc1.net' }))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", require("./routes/users"));
app.use("/api/wedding", require("./routes/wedding"));
app.use("/api/portfolio", require("./routes/portfolio"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/video", require("./routes/video"));

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
    const userAgent = req.headers["user-agent"];
    if (userAgent.includes("Googlebot") || userAgent.includes("bingbot") || userAgent.includes("Yandex"))  {
      res.sendFile(path.resolve(__dirname, "build", "index.html"));
    } else {
      res.sendFile(path.resolve(__dirname, "build", "200.html"));
    }
  });

module.exports = app;
