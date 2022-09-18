var express = require('express')
var passport = require('passport')
var session = require('express-session')
var app = express();

const PORT = 3000;
//세션 설정값 객체
var sessionObj = require('./config/session')
//.env파일 전역적으로 사용가능
require('dotenv').config({path: "./env/.env"});

app.use(session(sessionObj)); 
app.use(passport.initialize());
app.use(passport.session());

const users = require('./routes/login');
app.use('/users', users);

app.listen(PORT, () => {
  console.log('My REST API running on port ' + PORT + '!');
})

