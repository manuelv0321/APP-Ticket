
var mysql = require('mysql2');
//console.log(process.env.DB);
const dbSetting = {

    host : 'localhost',
    database : 'ticketsystem',
    user : 'root',
    password : '123456789',
    port: 3306
};

var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'ticketsystem',
    user : 'root',
    password : '123456789',
    port: 3306
}); 

 module.exports = conexion;