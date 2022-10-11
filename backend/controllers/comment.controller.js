// Importation schema comment
const Comment = require('../models/post.model');

// Logique métier routes comments (CRUD)

//Créer un commentaire
exports.createComment = (req, res, next) =>{
    const newComment = new Comment({
        userId: req.body.userId,
        postId: req.params.postId,
        message: req.body.message,
    });
    newComment.create(Comment)
        .then (() => res.status(201).json({ message: 'Commentaire enregistré.'}))
        .catch(error => res.status(400).json({message: "Impossible d'enregistrer le commentaire", error }))
}

//Modifier un commentaire
exports.modifyComment = (req, res, next) =>{
    const updateComment = new Comment({
        userId: req.params.userId,
        postId: req.params.postId,
        message: req.body.message
    });
    Comment.updateOne({_id: req.params.id}, updateComment)
        .then(() => res.status(200).json({ message: 'Commentaire modifié. '}))
        .catch(error => res.status(400).json({message: "Impossible de modifier le commentaire", error }))
}

//Récupérer un commentaire
exports.getOneComment = (req, res, next) =>{
    Comment.findOne({postId: req.params.postId})
        .then((post) => {res.status(200).json({post})})
        .catch((error) => {res.status(404).json({message: "Impossible de récupérer le commentaire ciblé", error})})
}

//Récupérer tous les commentaires
exports.getAllComment = (req, res, next) =>{
    Comment.find()
        .then((comment) => {res.status(200).json(comment)})
        .catch(error => res.status(400).json({message: "Impossible de récupérer tous les commentaires", error}));
}

//Supprimer un commentaire
exports.deleteComment = (req, res, next) =>{
    Comment.deleteOne({postId: req.params.postId})
        .then(() => res.status(200).json({message: 'Commentaire supprimé.'}))
        .catch(error => res.status(401).json({message: "Impossible de supprimer le commentaire", error}));
}

//Supprimer un commentaire ADMIN
exports.deleteCommentAdmin = (req, res, next) =>{
    Comment.deleteOne({postId: req.params.postId})
        .then(() => res.status(200).json({message: 'Commentaire supprimé.'}))
        .catch(error => res.status(401).json({message: "Impossible de supprimer le commentaire", error}));
}