// Importation mongoose
const mongoose = require('mongoose');

// Modèle post
const commentModel = mongoose.Schema({
    userId: {type: String, required: true},
    postId: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

// Exportation du modèle
module.exports = mongoose.model('Comment', commentModel);