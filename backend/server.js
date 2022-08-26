//모듈설치
//npm install --save express
//npm run start
//npm install cors --save

//터미널로 run
//node server.js

const express = require('express');
const app = express();
const cors = require('cors');
const index = require('./routes/index');

const PORT = 3000;

//cors 방지
app.use(cors());

app.use('/index', index);

//restful 하게 구현
app.delete('/', (req, res) => res.send('delete'));
app.post('/', (req, res) => res.send('post'));
app.get('/', (req, res) => res.send('get'));
app.put('/', (req, res) => res.send('put'));

app.listen(PORT, () => {
    console.log('My REST API running on port ' + PORT + '!');
})