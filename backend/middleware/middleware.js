const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

const middlewareArray = [
  cors({ origin: '*' }),
  express.urlencoded({ extended: true }),
  express.json(),
  morgan('dev'),
];

module.exports = (app) => {
  middlewareArray.forEach((middleware) => {
    app.use(middleware);
  });
  require('./passport/passport')(passport);
};
