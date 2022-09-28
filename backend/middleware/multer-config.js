// Importation de multer
const multer = require('multer');

// "Dictionnaire" des extensions de fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

// Objet de configuration multer
const storage = multer.diskStorage({
    // On choisit la destination du fichier (ici, le dossier image)
    destination: (req, file, callback) => {
        callback(null, 'assets')
    },
    // On choisit le nom du fichier pour éviter les conflits 
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // On élimine les espaces en les remplaçant par des underscores
        const extension = MIME_TYPES[file.mimetype]; // Element du dictionnaire qui correspond au mime type du fichier envoyer du front end
        callback(null, name + Date.now() + '.' + extension); // Timestamp
    }
});

// Exportation du middleware
module.exports = multer({storage: storage}).single('image');
