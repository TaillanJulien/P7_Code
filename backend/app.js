// Importation de EXPRESS
const express = require('express');

// Importation authentification
const auth = require('./middleware/auth')

//Importation multer
// const multer = require('./middleware/multer-config')

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
mongoose.connect(`mongodb+srv://Julien_admin:azerty@groupomania.a9h59nz.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie.'))
  .catch(() => console.log('Connexion à MongoDB échouée.'));
  
// Intercepte corps requête (req.body)
app.use(express.json());
  
// Utilisation des middlewares
app.use('/assets', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', auth, postRoutes);
app.use('/api/comments', auth, commentRoutes)
  
module.exports = app;