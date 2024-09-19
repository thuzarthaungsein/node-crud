const mysql = require("mysql2/promise");
const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "blog",
  password: "password",
});

module.exports = mysqlPool;
