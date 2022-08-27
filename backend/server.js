//모듈설치
//npm install --save express
//npm run start
//npm install cors --save
//npm install --save mysql

//터미널로 run
//node server.js

const express = require('express');
const app = express();
const cors = require('cors');
const index = require('./routes/index');
const db = require('./env/db');
const { createConnection } = require('net');

const PORT = 3000;

//cors 방지
app.use(cors());

app.use('/index', index);

//restful 하게 구현
app.delete('/', (req, res) => res.send('delete'));
app.post('/', (req, res) => res.send('post'));
app.get('/', (req, res) => res.send('get'));
app.put('/', (req, res) => res.send('put'));

//DB사용법 숙지
const dbopen = (req, res) =>{
    db.connect();
    console.log("dbopen");
    db.query('SELECT * FROM users', function(error, results, fields){
        if(error){
            console.log(error);
        }
        console.log(results);
    })
    db.end;
    console.log("dbclose");
}

app.get('/dbopen', dbopen);




app.listen(PORT, () => {
    console.log('My REST API running on port ' + PORT + '!');
})