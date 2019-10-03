const sequelize = require('sequelize');
const db = require('../db');

const Purchase = db.define('purchases', {
  symbol: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: sequelize.INTEGER
  },
  qty: {
    type: sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  timestamp: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW
  }
});

module.exports = Purchase;
