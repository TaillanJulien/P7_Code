//Importation mongoose
const mongoose = require('mongoose');

//Modèle sauces
const postModel = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    message: {type: String, required: true},
    imageUrl: {type: String, required: true},
    likes: {type: Number, default: 0},
    usersLiked: {type: [String]},
});

//Exportation du modèle
module.exports = mongoose.model('Post', postModel);