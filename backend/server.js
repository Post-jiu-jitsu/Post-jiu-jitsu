//.env파일 전역적으로 사용가능
require('dotenv').config({path: "./env/.env"});

var express = require('express')
var app = express();

var passport = require('passport')
var session = require('express-session')

//라우팅 위한 모듈추출
const users = require('./routes/login');
const diary = require('./routes/diary/diary');
const diarysimple = require('./routes/diary/diarysimple');
const diarytechtag = require('./routes/diary/diarytechtag');

var sessionObj = require('./config/session')

const PORT = 3000;
//세션 설정값 객체

app.use(session(sessionObj)); 
app.use(passport.initialize());
app.use(passport.session());

//로그인 관련 라우팅
app.use('/users', users);

//diary 관련 라우팅
app.use('/diary', diary);
app.use('/diarysimple', diarysimple);
app.use('/diarytechtag', diarytechtag);

app.listen(PORT, () => {
  console.log('My REST API running on port ' + PORT + '!');
})

