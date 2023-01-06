// Importation de EXPRESS
const express = require('express');

// Importation mongoose
const mongoose = require('mongoose'); 

// Importation et utilisation des routes
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const commentRoutes = require('./routes/comment.routes')

// Importation Helmet & CORS
const helmet = require('helmet');
const cors = require('cors');

// Appel de la méthode EXPRESS pour pouvoir créer une application
const app = express();

// Module path pour accèder au dossier image
const path = require('path');

// Sécurisation avec helmet
app.use(helmet());
app.use(cors());

// Importation "dotenv" (sécurisation BdD)
require('dotenv').config();

const mongo_pass = process.env.bdd_pass;
const mongo_name = process.env.bdd_name;

//Liaison à MONGODB
mongoose.connect(`mongodb+srv://Julien_admin:${mongo_pass}@${mongo_name}.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie.'))
    .catch(() => console.log('Connexion à MongoDB échouée.'));

    // Ajout headers pour éviter erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
    });

// Intercepte corps requête (req.body)
app.use(express.json());

// Utilisation des middlewares
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comments', commentRoutes)

module.exports = app;