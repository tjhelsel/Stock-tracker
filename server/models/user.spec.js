const { expect } = require('chai');
const db = require('./index');
const User = require('./user');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('User properties', () => {
    let user1, user2;

    beforeEach(async () => {
      user1 = await User.create({
        email: 'jdoe@email.com',
        firstName: 'John',
        lastName: 'Doe',
        password: '123'
      });
    });

    afterEach(() => {
      return db.sync({ force: true });
    });

    it('includes firstName, lastName, email, and password', () => {
      expect(user1.firstName).to.equal('John');
      expect(user1.lastName).to.equal('Doe');
      expect(user1.email).to.equal('jdoe@email.com');
      expect(user1.password).to.equal('123');
    });

    it('requires a unique email address', async () => {
      try {
        user2 = await User.create({
          email: 'jdoe@email.com',
          firstName: 'Jenny',
          lastName: 'Doe',
          password: '321'
        });
      } catch (error) {
        expect(error.name).to.be.equal('SequelizeUniqueConstraintError');
      }
      expect(user2).to.equal(undefined);
    });
  });
  console.log(Date.now());
  // describe('instanceMethods', () => {
  //   describe('correctPassword', () => {
  //     // it('returns true if the password is correct', () => {
  //     //   expect(cody.correctPassword('bones')).to.be.equal(true)
  //     // })
  //     // it('returns false if the password is incorrect', () => {
  //     //   expect(cody.correctPassword('bonez')).to.be.equal(false)
  //     // })
  //   });
  // });
});
