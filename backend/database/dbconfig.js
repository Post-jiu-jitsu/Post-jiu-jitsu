const mysql = require('mysql')

const db = mysql.createConnection({
    host : process.env.database_host,
    user : process.env.database_user,
    password : process.env.database_password,
    database : process.env.database_database,
    port : process.env.database_port
})

module.exports = db;