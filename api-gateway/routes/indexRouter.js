const express = require('express');
const router = express.Router();
const app = express();
const userRouter=require("./userrouter")
// Define client-specific routes
app.use('/user', userRouter);

module.exports = router;
