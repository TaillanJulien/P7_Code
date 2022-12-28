// Importation EXPRESS
const express = require('express');

// Utilisation méthode ROUTER
const router = express.Router();

// // Importation middlewares : auth (pour authentification) & multer (pour les fichiers)
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Controleur posts
const postCtrl = require('../controllers/post.controller');

// Routes pour les POST
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.delete('/admin/:id', postCtrl.deletePostAdmin);

module.exports = router;