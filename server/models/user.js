const sequelize = require('sequelize');
const db = require('./index');

const User = db.define('user', {
  firstName: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cash: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 500000
  }
});

module.exports = User;
