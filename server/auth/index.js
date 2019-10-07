const router = require('express').Router();
const { User, Purchase } = require('../models');

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
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user: ', email);
      res.status(401).send('Wrong username or password');
    } else {
      const { id, firstName, lastName, cash, purchases } = user;
      req.session.user = user;
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

router.post('/signout', (req, res, next) => {

  
  try {
    req.session.destroy();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/me', (req, res) => {
  res.json(req.session.user);
});

module.exports = router;
