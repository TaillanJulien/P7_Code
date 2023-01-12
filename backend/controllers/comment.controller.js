// Importation schema comment
const Comment = require('../models/comment.model');

// Logique métier routes comments (CRUD)

//Créer un commentaire
exports.createComment = (req, res, next) =>{
    const newComment = new Comment({
        userId: req.body.userId,
        postId: req.params.postId,
        message: req.body.message,
    });
    Comment.create(newComment)
        .then (() => res.status(201).json({ message: 'Commentaire enregistré.'}))
        .catch(error => res.status(400).json({message: "Impossible d'enregistrer le commentaire", error }))
}

//Modifier un commentaire
exports.modifyComment = (req, res, next) =>{
    const updateComment = {
        userId: req.params.userId,
        postId: req.params.postId,
        message: req.body.message
    };
    Comment.updateOne({_id: req.params.id}, updateComment)
        .then(() => res.status(201).json({ message: 'Commentaire modifié. '}))
        .catch(error => res.status(400).json({message: "Impossible de modifier le commentaire", error }))
}

//Récupérer tous les commentaires
exports.getAllComment = (req, res, next) =>{
    Comment.find()
        .then((comment) => {res.status(200).json(comment)})
        .catch(error => res.status(400).json({message: "Impossible de récupérer tous les commentaires", error}));
}

//Supprimer un commentaire
exports.deleteComment = (req, res, next) =>{
    Comment.deleteOne({_id: req.params.id})
        .then(() => res.status(201).json({message: 'Commentaire supprimé.'}))
        .catch(error => res.status(401).json({message: "Impossible de supprimer le commentaire", error}));
}