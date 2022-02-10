const mysql = require("mysql2");
const express = require("express");
const inputCheck = require("./utils/inputCheck");

const port = process.env.PORT ||3001;
const app = express();

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

//Get all candidates
app.get("/api/candidates", (req, res) => {
    const sql = `select * from candidates.*, parties.name
    as party_name
    from candidates
    left Join parties
    on candidates.party_id = parties.id`;
    

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: error.message});
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
})

//update candidate's party
app.put('/api/candidate.id:', (req, res) =>{
    const errors = inputCheck(req.body, 'party_id');

    if(errors){
        res.status(400).json({ error: errors });
        return;
    }
    
    const sql = `update candidates set party_id =? 
    where id =?`;
    const params =[req.body.party_id, req.params.id];
    db.query(sql, params ,(err, result) => {
        if(err) {
            res.status(400).json({ error: err.message});
            // check if record was found
        }else if(!result.affectedRows) {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});


// Get a single candidate
app.get("/api/candidate/:id", (req, res) => {
  const sql = `select * from candidates.*, parties.name
    as party_name
    from candidates
    left Join parties
    on candidate_id = parties.id
    where candidates.id =?`;
const params = [req.params.id];

db.query(sql, params, (err, rows) => {
    if (err) {
    res.status(400).json({ error: error.message });
    return;
    }
    res.json({
    message: "Success",
    data: rows,
    });
});
});

//Delete a candidate
app.delete("/api/candidate/:id",(req, res) => {
    const sql =`delete from candidates where id =?`;
    const params =[req.params.id];

db.query(sql, params, (err, result) => {
    if(err) {
        res.statusMessage(400).json({error: error.message});
    } else if (!result.affectedRows) {
        res.json ({
            message: "Candidate can not be found"
        });
    }else {
        res.json({
            message: "deleted",
            changes: result.affectedRows,
            id: req.params.id
        });
    }
});
});

// Create a new candidate
app.post("/api/candidate", ({body}, res) => {
    const errors =inputCheck(body, "first_name", "last_name", "industry_connected");
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }


    const sql = `insert into candidates (id,first_name,last_name, industry_connected)
                values (?,?,?,?)`;

    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message});
        }
        res.json ({
            message: "success",
            data: body
        });
    });
});
//route for all parties
app.get("/api/parties", (req, res) => {
    const sql = `SELECT * FROM parties`;
    db.query(sql, (err, rows) => {
    if (err) {
    res.status(500).json({ error: err.message });
    return;
    }
    res.json({
    message: "success",
    data: rows,
    });
});
});

//route for single party
app.get('/api/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: row
    });
    });
});

//delete party
app.delete('/api/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
    if (err) {
        res.status(400).json({ error: res.message });
        // checks if anything was deleted
    } else if (!result.affectedRows) {
        res.json({
        message: 'Party not found'
        });
    } else {
        res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
        });
    }
    });
});


app.use((req, res) => {
    res.status(404).end();
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
