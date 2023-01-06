// Importation modèle user
const User = require('../models/user.model');
// Importation bcrypt pour hasher le mot de passe
const bcrypt = require('bcrypt');
// Importation de json web token pour authentifier un utilisateur
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Controleurs utilisateur

// Inscription d'un utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '',
            password: hash
        });
        User.create(user)
        .then(() => res.status(201).json({message: 'Utilisateur créé.'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(401).json({error}));
};

// Connexion d'un utilisateur déjà existant
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            res.status(401).json({message: 'Utilisateur non trouvé.'})
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json({message: 'Mot de passe incorrect'})
                } else {
                    res.status(200).json({
                        user: {
                            userId: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            imageUrl: user.imageUrl
                        },
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                }
            })
            .catch(error => res.status(401).json({error}))
        }
    })
    .catch(error => res.status(401).json({error}))
};

// Récupération de tous les users
exports.getAllUsers = (req, res, next) =>{
    console.log("Récupération de tous les users");
    User.find()
    .then((post) => {res.status(200).json(post)})
    .catch(error => res.status(400).json({error})); 
};

// Modifier un User
exports.modifyUser = (req, res, next) => {
    User.findOne({_id: req.params.id})
    .then((user) => {
        const userModified = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : user.imageUrl,
    };
    if(user.imageUrl && req.file){
        const filename = user.imageUrl.split('images')[1];
        fs.unlink(`images/${filename}`, () => {})
    }
    User.updateOne({_id: req.params.id}, userModified)
    .then((user) => res.status(201).json(user))
    .catch(error => res.status(400).json({message: "Impossible de modifier le profil", error }))
})
};