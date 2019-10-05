const router = require('express').Router();
const { Purchase, User } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const purchases = await Purchase.findAll();
    res.status(200).json(purchases);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const purchases = await Purchase.findAll({
      where: {
        userId
      }
    });

    res.status(200).json(purchases);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { symbol, price, qty } = req.body;
    const totalPrice = Math.round(price * 100 * qty);
    const user = await User.findByPk(userId);
    if (user.cash < totalPrice) {
      throw new Error('Insufficient funds');
    }
    user.cash = user.cash - totalPrice;
    await user.save({ fields: ['cash'] });

    const purchase = await Purchase.create({ symbol, price, qty, userId });
    res.status(201).json(purchase);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
