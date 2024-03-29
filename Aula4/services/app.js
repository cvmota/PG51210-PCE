var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sensoresRouter = require('./routes/sensores');

const mongoose = require('mongoose');
// leituras é o nome da base de dados
const uri = "mongodb://localhost:9000/leituras"

var app = express();
mongoose.connect(uri).then(() => console.log('Connected!'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sensores', sensoresRouter);

module.exports = app;
