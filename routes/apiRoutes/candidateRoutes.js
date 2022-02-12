const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//Get all candidates
router.get("/candidates", (req, res) => {
    const sql = `select * from candidates , parties.name AS
    party_name
    FROM candidates
    LEFT JOIN parties ON candidates.party_id =
    parties.id`;
    

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
})

// Get a single candidate
router.get("/candidate/:id", (req, res) => {
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

// Create a new candidate
router.post("/candidate", ({body}, res) => {
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

//update candidate's party
router.put('/candidate.id:', (req, res) =>{
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




//Delete a candidate
router.delete("/candidate/:id",(req, res) => {
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

module.exports = router;