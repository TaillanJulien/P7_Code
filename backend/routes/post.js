// Importation EXPRESS
const express = require('express');

// Utilisation méthode ROUTER
const router = express.Router();

// Importation middleware auth
const auth = require('../middleware/auth');

// Importation multer
const multer = require('../middleware/multer-config');

// Controleur sauces
const postCtrl = require('../controllers/post');

// Routes pour les POST
router.get('/', auth, postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;