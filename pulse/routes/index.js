const express= require("express");
const router = express.Router();
const usersRouter = require('./users');
const testRouter = require('./test')
const formsRouter=require('./form')
const paymentRouter=require('./payment')
const cmsRouter=require("./cms")
const aboutus=require("./about")
const flowers=require("./flowers");
/* GET home page. */
router.get('/', (req, res) => {
  res.json({ title: 'App Server started successfully' });
});
router.use('/api/users', usersRouter);
router.use('/forms', formsRouter)
router.use('/test/', testRouter)
router.use('/payment',paymentRouter)
router.use('/flowers/', flowers)
router.use('/cms/', cmsRouter)
router.use('/about-us/', aboutus)
module.exports = router;
