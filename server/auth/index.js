const router = require('express').Router();
const { User, Purchase } = require('../models');
const passport = require('passport');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email
      },
      include: [{ model: Purchase }]
    });
    if (!user) {
      console.log('No such user: ', email);
      res.status(401).send('Wrong username or password');
    } else if (password !== user.password) {
      console.log('Incorrect password for user: ', email);
      res.status(401).send('Wrong username or password');
    } else {
      const { id, firstName, lastName, cash, purchases } = user;
      res.status(200).json({ id, firstName, lastName, cash, purchases });
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
    const { cash, id } = user;
    res.status(201).json({ firstName, lastName, email, cash, id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
