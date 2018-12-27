const mysql = require('mysql');

function initConnection() {
    return ( mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    }) );
}

module.exports = {
    initConnection: initConnection
}