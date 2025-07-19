const express = require('express');

module.exports = function(db){
    
    const router = express.Router();


    router.post('/', (req, res) =>{
        const {daftarUsername , daftarPassword} = req.body;
        if (!daftarUsername || !daftarPassword){
            return res.status(400).json({error: 'name and email are required'});
        }

        const query = `INSERT INTO USERS (name, password) VALUES (?, ?)`;
        db.run(query, [daftarUsername, daftarPassword], function(err){
            if(err){
                return res.status(500).json({error: err.message});
            }
            res.status(201).json({
                id: this.lastID,
                name : daftarUsername,
                password : daftarPassword
            });
        });
    });


    router.get('/', (req, res) =>{
        const {username, password} = req.query;
        const query = `SELECT * FROM users WHERE name = ? AND password = ?`;
        db.all(query, [username, password], (err, rows) =>{
            if(err) return res.status(500).json({error: err.message});
            res.json(rows);
        });
    });

    return router;
};