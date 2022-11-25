// Importation modèle user
const User = require('../models/user.model');
// Importation bcrypt pour hasher le mot de passe
const bcrypt = require('bcrypt');
// Importation de json web token pour authentifier un utilisateur
const jwt = require('jsonwebtoken');

// Controleurs utilisateur

// Inscription d'un utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        });
        user.save()
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
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
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

// Récupération d'une seul user
exports.getOneUser = (req, res, next) => {
    console.log("Récupération d'un seul user");
    User.findOne({_id: req.params.id})
    .then((post) => {res.status(200).json(post)})
    .catch((error) => {res.status(404).json({error: error})})
};
