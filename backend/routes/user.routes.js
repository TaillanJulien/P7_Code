// Importation express
const express = require('express');

// Utilisation méthode router
const router = express.Router();

// Controleur user
const userCtrl = require('../controllers/user.controller');

// Routes

// Inscription - Connexion - Déconnexion
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// router.get('/logout', userCtrl.logout);

// Récupération des users
router.get('/getAllUsers', userCtrl.getAllUsers);
router.get('/getOneUser/:id', userCtrl.getOneUser);

// Exportation router
module.exports = router;