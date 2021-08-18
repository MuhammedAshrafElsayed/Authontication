'use strict';

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express.Router();

app.get('/status', (req, res) => {
  if (mongoose.connection.readyState)
  return res.status(200).send('OK');
  else res.status(500).send('ERROR');
});
app.use(bodyParser.json({ limit: '20mb' }));

app.use(cors());

app.use('/api', require('./routes'));

app.use((err, req, res, next) => {
  const errorObj = JSON.stringify(err);
  res.status(500).end(errorObj);
  return next();
});
module.exports = app;