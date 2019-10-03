const router = require('express').Router();
const { Purchase } = require('../models');

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
    const purchase = await Purchase.create({ symbol, price, qty, userId });
    res.status(201).json(purchase);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
