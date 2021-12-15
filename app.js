var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var blogRouter = require('./routes/posts');
var pingRouter = require('./routes/ping');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/posts', blogRouter);
app.use('/api/ping', pingRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'API route not found: Internal server error.')
})

module.exports = app;
