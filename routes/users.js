const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const saltRounds = 10;
var Sequelize = require('sequelize')

const { validateToken, generateToken } = require('../middlewares');
const { findOne } = require('../controllers')
const db = require("../models");
const users = db.users;

const router = express.Router();
var cors = require('cors')
var corsOptions = {
  origin: ['http://3.249.114.12/', 'https://beta.gaiauae.com'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});
/** ****************************************************************************
 *                       Login - "POST /api/users/info"
 ***************************************************************************** */

router.get('/users/info', validateToken, async (req, res, next) => {
  // get userinfo based on id
  users.findByPk(req.query.id).then((user) => {
    console.log(user.dataValues)
    res.json({ user });
    res.end();
  })
});

// https://www.allsopp.com/
/** ****************************************************************************
 *                       Login - "POST /api/users/signup"
 ***************************************************************************** */

router.post('/signup', cors(corsOptions), (req, res) => {

  const newUser = users.build();

  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.email = req.body.email;
  newUser.mobile = req.body.mobile;
  newUser.userName = req.body.userName;
  newUser.password = req.body.password ? bcrypt.hashSync(req.body.password, saltRounds) : '';

  newUser.save().then((user) => {

    // save user and generate token
    // generateToken

    const token = generateToken(req.body);
    res.json({ user, token });
    res.end();
  })
    .catch((err) => {
      const messages = {};
      err.errors.forEach((error) => {
        messages[error.path] = error.message;
      });
      return res.status(422).send(messages);
    })

});

// https://www.allsopp.com/
/** ****************************************************************************
 *                       Login - "POST /api/users/signin"
 ***************************************************************************** */

router.post('/signin', cors(corsOptions), (req, res) => {
  /**Select user by username */
  users.findOne({
    where: {
      userName: req.body.userName
    }
  }).then(function (user) {
    const messages = {};

    if (!user) { // If user not exist 
      messages['userName'] = 'User name or password incorrect !';
      return res.status(422).send(messages);

    } else {  // If user exist check password 
      bcrypt.compare(req.body.password, user.password, function (err, isMatch) {

        if (err) {
          messages['userName'] = 'User name or password incorrect !';
          return res.status(422).send(messages);
        } else {

          if (isMatch) { // If user password is match 

            // generateToken
            const token = generateToken(req.body);
            res.json({ user, token });
            res.end();
          } else { // If user password is not match 
            messages['userName'] = 'User name or password incorrect !';
            return res.status(422).send(messages);

          }
        }
      })

    }


  }).catch((err) => {
    console.log(err.message)
    const messages = {};
    if (err.errors) {
      err.errors.forEach((error) => {
        messages[error.path] = error.message;
      });
    }
    return res.status(422).send(messages);
  })

});

module.exports = router;
