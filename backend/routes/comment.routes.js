// Importation EXPRESS
const express = require('express');

// Utilisation méthode ROUTER
const router = express.Router();

// Importation middlewares : auth (pour authentification)
const auth = require('../middleware/auth');

// Controleur comment
const commentCtrl = require ('../controllers/comment.controller');

// Routes pour les COMMENTS
router.get('/', commentCtrl.getAllComment);
router.post('/:postId', auth, commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;