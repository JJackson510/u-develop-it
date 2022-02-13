const express = require('express');
const { route } = require('.');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.post('/vote', ({ body}, res) => {
    //Data validation
    const errors = inputCheck(body, 'voter_id', 'candidate_id');
    if(errors) {
        res.status(400).json({ error: errors});
        return;
    }
    const sql = `insert into votes(voter_id, candidate_id) values(?,?)`;
    const params = [body.voter_id, body.candidate_id];

    db.query(sql, params, (err,results) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});

router.post('/vote', ({ body}, res) => {
    const errors = inputCheck(body, 'voter_id', 'candidate_id');
    if(errors) {
        res.status(400).json({ errors: errors})
        return;
    }
    const sql = `insert into votes(voter_id, candidate_id,) values(?,?)`;
    const params = [body.voter_id, body.candidate_id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ errors: err.message });
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});

module.exports = router;