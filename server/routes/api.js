const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const User = require('../../models/user');

// Connect
const connection = closure => {
  // return MongoClient.connect('mongodb://localhost:27017/mean-weather-app', (err, db) => {
  return MongoClient.connect(
    'mongodb://test-user:testpassword@ds147864.mlab.com:47864/weather-app',
    (err, db) => {
      if (err) return console.log(err);
      closure(db);
    }
  );
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Get users
router.get('/users', (req, res) => {
  connection(db => {
    db
      .collection('users')
      .find()
      .toArray()
      .then(users => {
        response.data = users;
        res.json(response);
      })
      .catch(err => {
        sendError(err, res);
      });
  });
});

router.post('/users', (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    cityAlerts: []
  });
  connection(db => {
    db
      .collection('users')
      .save(user)
      .then(function(result) {
        return res.status(201).json({
          message: 'User created',
          obj: result
        });
      })
      .catch(err => {
        return res.status(500).json({
          title: 'An error occurred',
          error: { message: 'This email is already registered' }
        });
      });
  });
});

router.post('/users/signin', (req, res) => {
  connection(db => {
    db
      .collection('users')
      .findOne({ email: req.body.email }, function(err, user) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        if (!user) {
          return res.status(401).json({
            title: 'Login failed',
            error: { message: 'Invalid Login credentials' }
          });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({
            title: 'Login failed',
            error: { message: 'Invalid Login credentials' }
          });
        }
        const token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
          message: 'Successfully logged in',
          token: token,
          userId: user._id
        });
      });
  });
});

module.exports = router;
