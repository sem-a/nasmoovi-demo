const express = require("express");
const router = express.Router();
const {
    all,
    forId,
    add,
    del,
    edit,
    editPreview,
    forPreview,
    alldel
} = require("../controllers/portfolio");
const { uploadPhoto } = require("../middleware/upload");

router.get("/", all);

// api/portfolio/:weeding
router.get("/:weeding", forId);

router.put("/update-preview", editPreview);

router.get("/get-preview/:id", forPreview);

// api/portfolio/add
router.post("/add/:id", uploadPhoto.array("photos", 100), add);

// api/portfolio/del/:id
router.post("/del/:id", del);

// api/portfolio/alldel/:weeding
router.post("/alldel/:id", alldel);

// api/portfolio/edit/:id
router.put("/edit/:id", edit);

module.exports = router;
