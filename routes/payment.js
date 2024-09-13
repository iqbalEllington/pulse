const express = require('express');
const router = express.Router();
var cors = require('cors');
const app = express();
// app.use(cors())
// var corsOptions = {
//   origin: ['https://www.gaiauae.com', 'https://gaiauae.com'],
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
const paymentController = require("../controllers/paymentController.js")
router.get('/pay', paymentController.index)
router.post('/pay/', paymentController.gettoken)
router.post('/status', paymentController.getstatus)

module.exports = router;
