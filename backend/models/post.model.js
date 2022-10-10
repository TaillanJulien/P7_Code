//Importation mongoose
const mongoose = require('mongoose');

//Modèle Post
const postModel = mongoose.Schema({
    userId: {type: String, required: true},
    message: {type: String, required: true, trim: true},
    imageUrl: {type: String},
    likes: {type: Number, default: 0},
    usersLiked: {type: [String]},
    comments: {type: [{commenterId: String, commenterName: String, message: String, timestamp: Number}]},
});

//Exportation du modèle
module.exports = mongoose.model('Post', postModel);