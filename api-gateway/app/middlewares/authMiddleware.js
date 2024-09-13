const jwt = require('jsonwebtoken');
const config = require('../../config');

const checkTokenType = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'Invalid or missing token' });
        }

        // Extract tokens
        const tokens = authorizationHeader.split(' ')[1]?.split('.');
        if (tokens.length !== 2) return res.status(401).json({ message: 'Invalid token format' });

        const [clientToken, userToken] = tokens;

        // Validate Client Token
        if (!clientToken) {
            return res.status(403).json({ message: 'Client token required' });
        }

        jwt.verify(clientToken, config.jwtSecret, (err, decodedClient) => {
            if (err) return res.status(401).json({ message: 'Invalid client token' });

            req.client = decodedClient; // Attach client token payload to request

            // Validate User Token if it exists
            if (userToken) {
                jwt.verify(userToken, config.jwtSecret, (err, decodedUser) => {
                    if (err) {
                        return res.status(401).json({ message: 'Invalid user token' });
                    }
                    req.user = decodedUser; // Attach user token payload to request
                    next();
                });
            } else {
                // No user token provided, proceed with client token validation
                req.user = null;
                next();
            }
        });
    } catch (exception) {
        res.status(501).json({ message: "Internal Server Error" });
    }
};

module.exports = { checkTokenType };
