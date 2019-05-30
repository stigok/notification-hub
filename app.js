const express = require('express');
const bodyParser = require('body-parser');
const api = require('./notifications.js');

function debug (...args) {
  if (process.env.DEBUG) {
    console.debug(...args);
  }
}

const app = express();

app.get('/', (req, res, next) => {
  const msg = api.next();
  if (!msg) {
    debug('No new notifications');
    return res.status(204).end();
  }
  res.json(msg);
});

app.post('/', bodyParser.json(), (req, res) => {
  if (!req.body || !req.body.message) {
    return res.status(400).end();
  }
  console.log('Add a new notification', req.body);
  api.add({
    title: req.body.title,
    message: req.body.message,
    date: new Date()
  });
  res.status(201).end();
});

app.use((req, res, next) => {
  res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server error');
});

module.exports = app;
