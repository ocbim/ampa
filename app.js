const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const config = require('./config/config');
const passport = require('passport');

// requerimiento de routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const adminRouter = require('./routes/admin');


// inicializacion
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// configuracion de cookie-parser
app.use(cookieParser());

// Configuracion de session
app.use(session({
  secret: 'holamundo',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    url:  config.urlDB ,
    autoReconnect: true
  })
}));

// Middleware de Passport
app.use(passport.initialize());
app.use(passport.session());

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares de router
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;