const mysql = require("mysql2");
require("dotenv").config();
const fs = require("fs");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(process.env.DB_CA_CERT),
  },
});

module.exports = db;
