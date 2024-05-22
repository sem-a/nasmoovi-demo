const express = require("express");
const router = express.Router();
const { all, one, add, del, edit } = require("../controllers/weeding");

// api/weeding/
router.get('/', all)

// api/weeding/:id
router.get('/:id', one);

// api/weeding/add
router.post("/add", add);

// api/weeding/del/:id
router.post("/del/:id", del);

// api/weeding/edit/:id
router.put("/edit/:id", edit);

module.exports = router
