const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

db.serialize(()=> {

    db.run(`DROP TABLE IF EXISTS users`);

    db.run(`CREATE TABLE users(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        password TEXT NOT NULL UNIQUE,
        created_at TEXT,
        updated_at DEFAULT CURRENT_TIMESTAMP
    )`);



});

db.close();
module.exports = db;