const mysql = require("mysql2");

// connect to databases
const db = mysql.createConnection(
    {
        host: "localhost",
        // your mysql username,
        user: "root",
        // your mysql password
        password: "Jacksonstakeall0313",
        database: "election"
    },
    console.log("Connected to the election database.")
);

module.exports = db;