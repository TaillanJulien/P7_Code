// Importation express
const express = require('express');

// Utilisation méthode router
const router = express.Router();

// Controleur user
const userCtrl = require('../controllers/user');

// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation router
module.exports = router;