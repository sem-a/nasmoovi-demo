const express = require("express");
const router = express.Router();
const { all, add, del } = require('../controllers/video');
const { uploadVideo } = require("../middleware/upload");

router.get("/", all);

// api/video/add
router.post("/add", uploadVideo.single("video"), add);

// api/video/del/:id
router.post("/del/:id", del);

module.exports = router;
