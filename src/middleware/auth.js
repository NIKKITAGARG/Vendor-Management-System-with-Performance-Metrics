const { verifyToken } = require('../utils/jwtUtils');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Unauthorized

    try {
        const user = verifyToken(token);
        req.user = user; // Attach user info to request
        next();
    } catch (err) {
        res.sendStatus(403); // Forbidden
    }
};

module.exports = { authenticateToken };
