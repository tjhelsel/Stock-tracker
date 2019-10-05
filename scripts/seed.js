'use strict';

const { User, Purchase } = require('../server/models');
const db = require('../server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  await Promise.all([
    User.create({
      email: 'jdoe@email.com',
      password: '123',
      firstName: 'John',
      lastName: 'Doe'
    }),
    User.create({
      email: 'lucy@email.com',
      password: 'ricky',
      firstName: 'Lucile',
      lastName: 'Ball'
    }),
    User.create({
      email: 'cwinslow@email.com',
      password: 'urkel',
      firstName: 'Carl',
      lastName: 'Winslow'
    })
  ]);

  await Promise.all([
    Purchase.create({
      symbol: 'MSFT',
      price: 136.28,
      qty: 20,
      userId: 1
    }),
    Purchase.create({
      symbol: '300135.SZ',
      price: 2.61,
      qty: 35,
      userId: 1
    }),
    Purchase.create({
      symbol: 'SNE',
      price: 111.28,
      qty: 35,
      userId: 2
    }),
    Purchase.create({
      symbol: 'XIACY',
      price: 7.52,
      qty: 100,
      userId: 3
    }),
    Purchase.create({
      symbol: 'MSFT',
      price: 132.0,
      qty: 50,
      userId: 1
    }),
    Purchase.create({
      symbol: 'SNE',
      price: 118.28,
      qty: 20,
      userId: 2
    })
  ]);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

runSeed();
