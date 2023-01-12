// Importation express
const express = require('express');

// Utilisation méthode router
const router = express.Router();

// Controleur user
const userCtrl = require('../controllers/user.controller');

// Importation middleware MULTER pour photo de profil
const multer = require('../middleware/multer-config');

// Routes

// Inscription - Connexion
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);

// Récupération des users
router.get('/getAllUsers', userCtrl.getAllUsers);

// Modification user
router.put('/modifyUser/:id', multer, userCtrl.modifyUser);

// Exportation router
module.exports = router;