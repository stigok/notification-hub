#!/usr/bin/env node
const express = require('express');
const morgan = require('morgan');

const app = require('../app.js');

const PORT = process.env.PORT || 3000;
const ADDRESS = process.env.ADDRESS || '127.0.0.1';

const www = express();
www.disable('etag');
www.disable('x-powered-by');
www.use(morgan('combined', {
  skip (req, res) {
    // Don't log requests resulting in 204
    return res.statusCode === 204;
  }
}));

// Add main app
www.use(app);

www.listen(PORT, ADDRESS, (err) => {
  if (err) throw new Error('Error when starting server', err);
  console.log(`Listening on ${ADDRESS}:${PORT}`);
});
