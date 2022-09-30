// Importation de EXPRESS
const express = require('express');

// Importation mongoose
const mongoose = require('mongoose'); 

// Importation et utilisation des routes
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user')

// Importation Helmet
const helmet = require('helmet');

// Appel de la méthode EXPRESS pour pouvoir créer une application
const app = express();

// Module path pour accèder au dossier image
const path = require('path');

// Sécurisation avec helmet
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));

// Importation "dotenv" (sécurisation BdD)
require('dotenv').config();

const mongo_pass = process.env.bdd_pass;
const mongo_name = process.env.bdd_name;

//Liaison à MONGODB
mongoose.connect(`mongodb+srv://Julien_admin://${mongo_name}:${mongo_pass}@groupomania.a9h59nz.mongodb.net/?retryWrites=true&w=majority`,
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
app.use('/assets', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
  
module.exports = app;