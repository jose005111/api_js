const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// ... outras rotas ...
router.post('/', loginController.login);
module.exports = router;