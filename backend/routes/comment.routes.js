// Importation EXPRESS
const express = require('express');

// Utilisation méthode ROUTER
const router = express.Router();

// // Importation middlewares : auth (pour authentification) & multer (pour les fichiers)
// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

// Controleur comment
const commentCtrl = require ('../controllers/comment.controller');

// Routes pour les COMMENTS
router.get('/', commentCtrl.getAllComment);
router.get('/:id', commentCtrl.getOneComment);
router.post('/:postId', commentCtrl.createComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);
router.delete('/admin/:id', commentCtrl.deleteCommentAdmin);

module.exports = router;