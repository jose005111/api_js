require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mainline.proxy.rlwy.net',
  port: '29418',
  user: 'root',
  database: 'railway',
  password: 'UBdwKbhmHdzBJfAzYvweLIAcqhiFMENU',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
