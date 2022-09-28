// Importation schema post
const Post = require('../models/post')

// Importation de fs (permet de supprimer des fichiers)
const fs = require('fs');

// Logique métier routes (CRUD) :

// Création d'un post
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/assets/${req.file.filename}`
  });
  post.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré.'}))
    .catch(error => res.status(400).json({error}));
};

// Récupération d'une seul post
exports.getOnePost = (req, res, next) => {
  console.log("Récupération d'un post");
  Post.findOne({_id: req.params.id})
  .then((post) => {res.status(200).json(post)})
  .catch((error) => {res.status(404).json({error: error})})
};

//Modifier un post
exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    const filename = post.imageUrl.split("/assets/")[1];
    fs.unlink(`images/${filename}`, () => {
    const postObject = req.file ?
      {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié. '}))
      .catch(error => res.status(400).json({ error }));
    });
  });
};

// Supprimer un post
exports.deletePost = (req,res, next) => {
  Post.findOne({_id: req.params.id})
    .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message: 'Objet supprimé.'}))
            .catch(error => res.status(401).json({error}));
        })  
    })
    .catch(error => res.status(401).json({error}))
};

// Récupération de tous les post
exports.getAllPost = (req, res, next) =>{
    console.log("Récupération de tous les post");
    Post.find()
    .then((post) => {res.status(200).json(post)})
    .catch(error => res.status(400).json({error})); 
};

// Like & dislike

exports.userLikeDislike = (req, res, next) =>{

// Like de l'utilisateur

  if(req.body.like === 1){
    Post.updateOne({_id: req.params.id}, {
      $inc: {likes: req.body.like}, 
      $push:{usersLiked: req.body.userId}
    })
    .then((post) => res.status(200).json({message: "Like de l'utilisateur"}))
    .catch(error => res.status(400).json({error}));
  }

// Dislike de l'utilisateur

  else if (req.body.like === -1){
    Post.updateOne({_id: req.params.id},{
      $inc: {dislikes: -1 * req.body.like},
      $push: {usersDisliked: req.body.userId},
    })
    .then((post) => res.status(200).json({message: "Dislike de l'utilisateur"}))
    .catch(error => res.status(400).json({error}));
  } 
  
// Annulation du like ou du dislike de l'utilisateur

  else {
    Post.findOne({_id: req.params.id})
    .then((post) => {
      if(post.usersLiked.includes(req.body.userId)){
        Post.updateOne(
          {_id: req.params.id},
          {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}}
        )
    .then((post) => res.status(200).json({message: "Like annulé."}))
    .catch(error => res.status(400).json({error}));
      } 
    else if (post.usersDisliked.includes(req.body.userId)){
      Post.updateOne(
        {_id: req.params.id},
        {$pull: {usersDisliked: req.body.userId}, $inc: {dislikes: -1}},
      )
      .then((post) => res.status(200).json({message: "Dislike annulé."}))
      .catch(error => res.status(401).json({error}))
    }
    })
    .catch(error => res.status(401).json({error}));
  }
};