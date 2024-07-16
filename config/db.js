const fs = require('fs');
//require('dotenv').config();
const dotenv = require('dotenv');

// Determine the environment
const environment = process.env.NODE_ENV || 'development';

// Build the path to the appropriate .env file
const envFilePath = `.env.${environment}`;

console.log('env: ' + envFilePath);

//require('dotenv').config();
// Load the environment variables from the appropriate file
if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
  console.log(
    `db.js - Using ${envFilePath} file to supply config environment variables`,
  );
} else {
  console.error(`db.js - No ${envFilePath} file found`);
}

var mysql = require('mysql2/promise');
var mysqlConnection = require('mysql2');

var con = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
});

var connection = mysqlConnection.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to the database:', err.code);
        console.error('Detailed error message:', err.message);
        console.error('Stack trace:', err.stack);
        return;
      }
      console.log('Connected!');
});

module.exports = { con, connection };
