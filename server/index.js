const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('./db');
const session = require('express-session');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(
  session({
    secret: 'top_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
  })
);

app.use('/auth', require('./auth'));
app.use('/api/purchases', require('./api/purchase'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server did not respond.');
});

db.sync({ force: false });

app.listen(PORT, () => {
  console.log(`Server is listening on port # ${PORT}`);
});

module.exports = app;
