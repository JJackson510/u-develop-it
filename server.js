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


// db.query(`select * from candidates`, (err,rows) => {
//     console.log(rows);
// });

//Get a single candidate
// db.query(`select * from candidates where id = 1`,(err, row) => {
//     if(err) {
//         console.error(err);
//     }
//     console.log(row);
// });

//Delete a candidate
// db.query(`delete from candidates where id = ?`, 1, (err, result) => {
//     if(err) {
//         console.error(err);
//     }
//     console.log(result);
// });

// Create a new candidate
const sql = `insert into candidates (id,first_name,last_name, industry_connected)
            values (?,?,?,?)`;

const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if(err) {
        console.error(err);
    }
    console.log(result);
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});