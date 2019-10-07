const crypto = require('crypto');
const sequelize = require('sequelize');
const db = require('../db');

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
    },
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    }
  },
  cash: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 500000,
    validate: {
      min: 0
    }
  }
});

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});

module.exports = User;
