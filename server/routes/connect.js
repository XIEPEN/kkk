
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost', 
    user     : 'root',     
    password : 'ROOT',   
    database : 'server'   
})
connection.connect(() => {
    console.log('数据库连接成功!')
})
// 暴露出去
module.exports = connection