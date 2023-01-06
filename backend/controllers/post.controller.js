// Importation schema post
const Post = require('../models/post.model');
const Comment = require('../models/comment.model')

// Importation de fs (permet de supprimer des fichiers)
const fs = require('fs');

// Logique métier routes posts (CRUD) :

//Créer un post
exports.createPost = (req, res, next) => {
  const newPost = Post({
    userId: req.body.userId,
    message: req.body.message,
    likes: req.body.likes,
    imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '',
    comments: []
  });
  Post.create(newPost)
    .then(() => res.status(201).json({ message: 'Post enregistré.'}))
    .catch(error => res.status(400).json({message: "Impossible d'enregistrer le post", error }))
}

// Modifier un post
exports.modifyPost = (req, res, next) => {
  Post.findOne({_id: req.params.id})
  .then((post) => {
    const updatePost = {
      _id: req.params.id,
      message: req.body.message,
      userId: req.body.userId,
      imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : post.imageUrl,
      likes: req.body.likes
    };
    if(post.imageUrl && req.file){
      const filename = post.imageUrl.split('images')[1];
      fs.unlink(`images/${filename}`, () => {})
    }
      Post.updateOne({_id: req.params.id}, updatePost)
      .then(() => res.status(201).json({ message: 'Post modifié. '}))
      .catch(error => res.status(400).json({message: "Impossible de modifier le post", error }))
  })
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
  Comment.deleteOne({postId: req.params.id})
  .catch(error => res.status(401).json({message: "Impossible de supprimer les commentaires du post", error}));
  Post.findOne({_id: req.params.id})
  .then(post => {
    const filename = post.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Post.deleteOne({_id: req.params.id})
        .then(() => res.status(201).json({message: 'Post supprimé.'}))
        .catch(error => res.status(401).json({error}));
    })
  })
  .catch(error => res.status(401).json({message: "Impossible de supprimer le post", error}));
};

// Récupération de tous les posts
exports.getAllPost = (req, res, next) => {
    console.log("Récupération de tous les post");
    Post.find()
    .then((post) => {res.status(200).json(post)})
    .catch(error => res.status(400).json({message: "Impossible de récupérer tous les posts", error}));
};
