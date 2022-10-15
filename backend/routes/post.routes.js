// Importation EXPRESS
const express = require('express');

// Utilisation méthode ROUTER
const router = express.Router();

// Importation middlewares : auth (pour authentification) & multer (pour les fichiers)
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Controleur posts & comments
const postCtrl = require('../controllers/post.controller');
const commentCtrl = require ('../controllers/comment.controller');

// Routes pour les POST
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);
router.delete('/admin/:id', postCtrl.deletePostAdmin);

// Routes pour les COMMENTS
router.post('/:postId/comments', commentCtrl.createComment);
router.get('/:postId/comments', commentCtrl.getAllComment);
router.get('/:postId/comments/:id', commentCtrl.getOneComment);
router.put('/:postId/comments/:id', commentCtrl.modifyComment);
router.delete('/:postId/comments/:id', commentCtrl.deleteComment);
router.delete('/admin/:postId/comments/:id', commentCtrl.deleteCommentAdmin);

module.exports = router;