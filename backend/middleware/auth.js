// Importation json web token
const jwt = require('jsonwebtoken');

// Middleware authentification
module.exports = (req, res, next) => {
try{
    const token = req.headers.authorization;
    const verifyToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = verifyToken.userId;
    if(userId === process.env.idAdmin){
        next()
    } else {
        if (!verifyToken) {
            throw 'Utilisateur non valide.';
        } else {
            next()
        }
    }
} catch {
    res.status(401).json({error: new Error('Invalid request - Authorisation problem')});
}
};