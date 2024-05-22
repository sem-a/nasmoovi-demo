const express = require('express');
const router = express.Router();
const { add, all } = require('../controllers/comment');

// api/comment/add
router.post('/add', add);

// api/comment/
router.get('/', all);

module.exports = router;
