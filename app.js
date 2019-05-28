const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./notifications.js');

const app = express();
app.use(morgan('combined'));
app.disable('etag');
app.disable('x-powered-by');

app.get('/', (req, res, next) => {
  const msg = api.next();
  if (!msg) {
    console.debug('No new notifications');
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

const PORT = process.env.PORT || 3000;
const ADDRESS = process.env.ADDRESS || '127.0.0.1';

app.listen(PORT, ADDRESS, (err) => {
  if (err) throw new Error('Error when starting server', err);
  console.log(`Listening on ${ADDRESS}:${PORT}`);
});
