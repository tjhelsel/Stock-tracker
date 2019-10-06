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
    type: sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    },
    set(price) {
      this.setDataValue('price', price * 10000);
    }
  },
  qty: {
    type: sequelize.INTEGER,
    allowNull: false,
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
