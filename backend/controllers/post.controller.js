// Importation schema post
const Post = require('../models/post.model')

// Importation de fs (permet de supprimer des fichiers)
const fs = require('fs');

// Logique métier routes (CRUD) :

// Création d'un post
// exports.createPost = (req, res, next) => {
//   const postObject = req.body.post;
//   // delete postObject._id;
//   const post = new Post({
//     ...postObject,
//     imageUrl: `${req.protocol}://${req.get('host')}/assets/${req.file.filename}`
//   });
//   post.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré.'}))
//     .catch(error => res.status(400).json({message: "Impossible de créer un nouveau post", error}));
// };

exports.createPost = async (req, res, next) =>{
  const newPost = new Post({
    userId: req.body.userId,
    message: req.body.message,
    imageUrl: req.body.imageUrl,
    likes: req.body.likes,
    comments: []
  });
  try{
    const post = await newPost.save();
    return res.status(201).json({ message: 'Objet enregistré.'});
  } catch(err){
    return res.status(400).json({message: "Impossible de créer un nouveau post", err})
  }
}

exports.modifyPost = (req, res, next) => {
  const updatePost = new Post({
    _id: req.params.id,
    message: req.body.message,
    userId: req.body.userId
  });
  Post.updateOne({_id: req.params.id}, updatePost)
  .then(() => res.status(200).json({ message: 'Objet modifié. '}))
  .catch(error => res.status(400).json({message: "Impossible de modifier le post", error }))
};

// Supprimer un post
exports.deletePost = (req,res, next) => {
  Post.findOne({_id: req.params.id})
  .then(post => {
    const filename = post.imageUrl.split('/assets/')[1];
    fs.unlink(`assez/${filename}`, () => {
      Post.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({message: 'Objet supprimé.'}))
      .catch(error => res.status(401).json({message: "Impossible de supprimer l'image", error}));
    })  
  })
  .catch(error => res.status(401).json({message: "Impossible de supprimer le post", error}))
};

// Récupération d'un seul post
exports.getOnePost = (req, res, next) => {
  console.log("Récupération d'un post");
  Post.findOne({_id: req.params.id})
  .then((post) => {res.status(200).json(post)})
  .catch((error) => {res.status(404).json({message: "Impossible de récupérer le post ciblé", error: error})})
};

// Récupération de tous les posts
exports.getAllPost = (req, res, next) =>{
    console.log("Récupération de tous les post");
    Post.find()
    .then((post) => {res.status(200).json(post)})
    .catch(error => res.status(400).json({message: "Impossible de récupérer tous les posts", error}));
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