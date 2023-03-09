require('dotenv').config()
const HOST = process.env.HOST || 'localhost'
var mysql = require('mysql');
var con = mysql.createConnection({
    host: HOST,
    user: "root",
    password: "",
    database: "zingmp3"
  });

module.exports = con
