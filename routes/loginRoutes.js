const express = require('express');
const router = express.Router();
const loginController = require('./controllers/loginController');

// ... outras rotas ...
router.post('/login', loginController.login);

module.exports = router;