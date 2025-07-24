const express = require('express');

module.exports = function(db){
    
    const router = express.Router();
    const crypto = require('crypto');
    
    router.post('/daftar', (req, res) =>{
        const salt = crypto.randomBytes(16).toString('hex');
        const {daftarUsername, daftarPassword} = req.body;

        const passDgnSalt = daftarPassword + salt;
        const hashedPassword = crypto.createHash('sha256').update(passDgnSalt).digest('hex');
        
        if (!daftarUsername || !daftarPassword){
            return res.status(400).json({error: 'name and email are required'});
        }

        const query = `INSERT INTO USERS (name, password, salt) VALUES (?, ?, ?)`;
        db.run(query, [daftarUsername, hashedPassword, salt], function(err){
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



    router.post('/login', (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username dan password harus diisi' });
        }

        const query = `SELECT * FROM users WHERE name = ?`;
        db.get(query, [username], (err,row) => {
           
            if(err)return res.status(400).json ({error: err.message});
            if(!row)return res.status(401).json ({error : 'hasil Tidak Ditemukan'});
           
            const passDgnSalt = password + row.salt;
            const hashedPassword = crypto.createHash('sha256').update(passDgnSalt).digest('hex');

            if(hashedPassword === row.password){
                return res.status(200).json ({
                    message: 'login Berhasil',
                    user: {
                        id: row.id,
                        name: row.name
                    }
                });
            }else{
                return res.status(401).json({error: 'Password Salah'});
            }
        });




    });

    return router;
};