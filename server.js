//deklarasi port panggil express dan sqlite3 module
const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

//koneksi ke sqlite
const dbPath = path.resolve(__dirname, 'db/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Gagal buka database:', err.message);
    } else {
        console.log('✅ Terhubung ke SQLite database');
    }
});

//panggil routes sbg storage masing masing (konteks ini menggunakan users)
const userRouter = require('./routes/users')(db);

//middleware Global
app.use(express.json());
app.use(express.static('public'));

/*panggil Objectnya sertakan tambahan /users
 untuk menambah setiap perintah awalnya
 sesuai khusus table nya dimana*/
app.use('/users', userRouter);

//jalankan localhost nya menggunakan port nya
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});