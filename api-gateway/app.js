const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config'); // Make sure you have your config set up
const app = express();
const PORT = process.env.PORT || 3000;
const { checkTokenType } = require('./app/middlewares/authMiddleware'); // Import the middleware
app.use(express.json());
app.use(checkTokenType);

const indexRouter = require("./routes/indexRouter")
// // Example route for user-specific access
// app.get('/user-resource', (req, res) => {
//     if (req.user && req.user.aud === 'user') {
//         res.json({ message: 'This is a user-specific resource' });
//     } else {
//         res.status(403).json({ message: 'Access forbidden' });
//     }
// });

// // Example route for client-specific access
// app.get('/client-resource', (req, res) => {
//     if (req.client) {
//         res.json({ message: 'This is a client-specific resource' });
//     } else {
//         res.status(403).json({ message: 'Access forbidden' });
//     }
// });

app.use('/', indexRouter);

// Middleware to differentiate between internal, external, and mobile clients
// app.use((req, res, next) => {
//     if (!req.client) return next();

//     const clientType = req.client.aud;

//     if (clientType === config.jwtAudience.internal) {
//         // Logic for internal clients
//         console.log('Internal client access');
//     } else if (clientType === config.jwtAudience.external) {
//         // Logic for external clients
//         console.log('External client access');
//     } else if (clientType === config.jwtAudience.mobile) {
//         // Logic for mobile app clients
//         console.log('Mobile client access');
//     }

//     next();
// });

// Function to enforce internal client access
// function internalClientOnly(req, res, next) {
//     if (req.client && req.client.aud === config.jwtAudience.internal) {
//         next();
//     } else {
//         res.status(403).json({ message: 'Access forbidden: Internal clients only' });
//     }
// }

// Function to enforce external client access
// function externalClientOnly(req, res, next) {
//     if (req.client && req.client.aud === config.jwtAudience.external) {
//         next();
//     } else {
//         res.status(403).json({ message: 'Access forbidden: External clients only' });
//     }
// }

// app.get('/internal-resource', internalClientOnly, (req, res) => {
//     res.json({ message: 'This is an internal resource' });
// });

// app.get('/external-resource', externalClientOnly, (req, res) => {
//     res.json({ message: 'This is an external resource' });
// });

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'Invalid or missing token' });
    } else {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
