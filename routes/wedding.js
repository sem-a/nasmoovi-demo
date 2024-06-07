const express = require("express");
const router = express.Router();
const { all, one, add, del, edit, name } = require("../controllers/weeding");

// api/wedding/
router.get("/", all);

// api/wedding/:id
router.get("/:id", one);

// api/wedding/name/:id
router.get("/name/:id", name);

// api/wedding/add
router.post("/add", add);

// api/wedding/del/:id
router.post("/del/:id", del);

// api/wedding/edit/:id
router.put("/edit/:id", edit);

module.exports = router;
