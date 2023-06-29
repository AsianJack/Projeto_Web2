const fs = require('fs');
var path = require('path');
const { execSync } = require('child_process');
const nodeModulesExists = fs.existsSync(path.join(__dirname, 'node_modules'));
if (!nodeModulesExists) {
  execSync('npm install --force-sync');
}

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pedidosRouter = require('./routes/pedidos_pastel');
var pastelRouter = require('./routes/pastel');

var app = express();

var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pedidos', pedidosRouter);
app.use('/pastel', pastelRouter);

app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
