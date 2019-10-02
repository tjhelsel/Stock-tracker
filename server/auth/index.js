const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email
    });
    if (!user) {
      console.log('No such user: ', email);
      res.status(401).send('Wrong username or password');
    } else if (password !== user.password) {
      console.log('Incorrect password for user: ', email);
      res.status(401).send('Wrong username or password');
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
