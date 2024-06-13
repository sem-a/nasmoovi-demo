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

const pages = ['200.html', '404.html', 'wedding/index.html', 'video/index.html'];

app.use((req, res, next) => {
  const userAgent = req.headers["user-agent"];
  
  if (userAgent.includes("Yandex")) {
    const requestedPage = req.url.substring(1); // Получаем запрошенную страницу из URL
    if (pages.includes(requestedPage)) {
      const htmlCopy = fs.readFileSync(path.join("build", requestedPage), "utf8");
      res.send(htmlCopy);
    } else {
      // Если страница не найдена, отдаем страницу 200.html
      const htmlCopy = fs.readFileSync(path.join("build", "404.html"), "utf8");
      res.send(htmlCopy);
    }
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

module.exports = app;
