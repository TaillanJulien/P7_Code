// Importation json web token
const jwt = require('jsonwebtoken');

// Middleware authentification
module.exports = (req, res, next) => {
try{
    const token = req.headers.authorization.split(' ')[1];
    const verifyToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = verifyToken.userId;
    console.log(userId);
    if (req.body.userId && req.body.userId !== userId) {
        throw 'Utilisateur non valide.';
    } else {
        next()
    }
} catch {
    res.status(401).json({error: new Error('Invalid request - Authorisation problem')});
}
};