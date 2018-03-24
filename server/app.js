var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routers = require('./routes/route_app')
var routers = require('./routes/routers')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//处理webpack服务请求

app.use('/api',routers)

// app.use('/_webpack_hmr', function (req,res) {
//   res.send('')
// });
// app.use('/', function (req,res) {
//   res.redirect('app');
// });
// app.use('/app', routers.index);
// app.get(/\/movie\/hot\//, routers.hot);
// app.get(/\/movie\/cinema\//, routers.cinema);
// app.get(/\/movie\/info\//, routers.info);
// app.get(/\/movie\/evaluation\//, routers.evaluation);
// app.get(/\/movie\/coming\//, routers.coming);
// app.get(/\/movie\/coming\/[\w\W]*/, routers.comingLimit);
//
// app.get('/movie/swiper', routers.swiper);
// app.get('/movie/city', routers.city);
// app.get('/movie/cinema_detail', routers.cinema_detail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
