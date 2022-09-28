// Importation EXPRESS
const express = require('express');

// Utilisation méthode ROUTER
const router = express.Router();

// Importation middleware auth
const auth = require('../middleware/auth');

// Importation multer
const multer = require('../middleware/multer-config');

// Controleur sauces
const sauceCtrl = require('../controllers/post');

// Routes disponibles
router.get('/', auth, sauceCtrl.getAllPost);
router.post('/', auth, multer, sauceCtrl.createPost);
router.get('/:id', auth, sauceCtrl.getOnePost);
router.put('/:id', auth, multer, sauceCtrl.modifyPost);
router.delete('/:id', auth, sauceCtrl.deletePost);
router.post('/:id/like', auth, sauceCtrl.userLikeDislike);

module.exports = router;