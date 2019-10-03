const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('./models');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/auth', require('./auth'));

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
