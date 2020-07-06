const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        return next(createError(401, 'Not authorized!'));
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'imissananyasomuch');
    } catch(e) {
        return next(createError(500, 'Something went wrong with decoding token!'));
    }
    if(!decodedToken) {
        return next(createError(401, 'Not authorized!'));
    }
    req.userId = decodedToken.userId;
    next();    
}