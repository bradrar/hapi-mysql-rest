var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : "dbname",
    insecureAuth : true
  });

  module.exports = connection;