//Importation mongoose
const mongoose = require('mongoose');

//Importation plugin unique validator
const uniqueValidator = require('mongoose-unique-validator');

//Modèle utilisateur
const userModel = mongoose.Schema({
    userId: {type: String, required: true},
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    picture: {default: ""},
    likes: [String],
});

//Attribution du plugin au modèle
userModel.plugin(uniqueValidator);

//Exportation du modèle
module.exports = mongoose.model('User', userModel);