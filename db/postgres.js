const { Pool } = require('pg');

// Konfigurasi koneksi PostgreSQL
const pool = new Pool({
  user: 'minigame_user',         // username PostgreSQL yang kamu buat
  host: 'localhost',      // atau IP database server
  database: 'minigame_db',     // nama database PostgreSQL kamu
  password: 'minigame_secret', // password PostgreSQL kamu
  port: 5432,             // port default PostgreSQL
});

pool.on('connect', () => {
    console.log('✅ Terhubung ke PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Error koneksi PostgreSQL:', err.message);
});

module.exports = pool;
