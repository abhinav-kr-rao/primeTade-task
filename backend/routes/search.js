const express = require('express');
const router = express.Router();
const { searchItems } = require('../controllers/searchController');
const authenticateToken = require('../middlewares/auth');

router.get('/', authenticateToken, searchItems);

module.exports = router;
