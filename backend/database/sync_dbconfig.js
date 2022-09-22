const sync_mysql = require('sync-mysql')



const sync_db2 = new sync_mysql({
    host : process.env.database_host,
    user : process.env.database_user,
    password : process.env.database_password,
    database : process.env.database_database,
    port : process.env.database_port
})

module.exports = sync_db2;