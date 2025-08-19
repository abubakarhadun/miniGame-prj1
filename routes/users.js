const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

module.exports = function(db){
    
    const router = express.Router();
    const crypto = require('crypto');
    
    router.post('/daftar', async (req, res) => {
        const salt = crypto.randomBytes(16).toString('hex');
        const {daftarUsername, daftarPassword} = req.body;

        const passDgnSalt = daftarPassword + salt;
        const hashedPassword = crypto.createHash('sha256').update(passDgnSalt).digest('hex');
        
        if (!daftarUsername || !daftarPassword){
            return res.status(400).json({error: 'name and email are required'});
        }

        try{
            const query = `INSERT INTO useraja (name, password, salt) VALUES ($1, $2, $3) RETURNING id`;
            const result = await db.query(query, [daftarUsername, hashedPassword, salt]);

            res.status(201).json({
                id : result.rows[0].id,
                name: daftarUsername,
                password: daftarPassword
            });
        }catch(err){
            return res.status(500).json({error : err.message});
        }
    });



    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username dan password harus diisi' });
        }

        try{
            const query = `SELECT * FROM useraja WHERE name = $1`;
            const result = await db.query(query, [username]);

            if(result.rows.length === 0)return res.status(401).json({error : 'Hasil Tidak Ditemukan'});

            const row = result.rows[0];
            const passDgnSalt = password + row.salt;
            const hashedPassword = crypto.createHash('sha256').update(passDgnSalt).digest('hex');

            if(hashedPassword === row.password){
                return res.status(200).json({
                    message: 'Login Berhasil',
                    user: {
                        id: row.id,
                        name: row.name
                    }
                });
            }else{
                return res.status(401).json({error: 'Password Anda Salah'});
            }
            
        }catch(err){
            return res.status(500).json({error: err.message});
        }
            

    });
    
    return router;
};