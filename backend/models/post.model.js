//Importation mongoose
const mongoose = require('mongoose');

//Modèle Post
const postModel = mongoose.Schema({
    userId: {type: String, required: true},
    message: {type: String, required: true, trim: true},
    imageUrl: {type: String},
    date: {type: Date, default: Date.now}
});

//Exportation du modèle
module.exports = mongoose.model('Post', postModel);