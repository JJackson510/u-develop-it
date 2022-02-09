const mysql = require('mysql2');
const express = require('express');
const port = process.env.PORT ||3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// connect to databases
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your mysql username,
        user: 'root',
        // your mysql password
        password: 'Jacksonstakeall0313',
        database: 'election'
    },
    console.log('Connected to the election database.')
);


db.query(`select * from candidates`, (err,rows) => {
    console.log(rows);
})
app.use((req, res) => {
    res.status(404).end();
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});