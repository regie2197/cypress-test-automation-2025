const SECRET_KEY = 'mysecretkey';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token !== 'STATIC_TOKEN_123') {
        return res.sendStatus(401);
    }
    next();
};

module.exports = authenticateToken;
