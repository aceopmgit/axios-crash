const mysql=require('mysql2')
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:'Ace@1535'
})

module.export=pool.promise();