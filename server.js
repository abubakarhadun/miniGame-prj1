const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // gantiin body-parser.json()
app.use(express.static('./public'));


// Koneksi ke PostgreSQL
const pool = require('./db/postgres.js')

// Panggil routes users, passing pool PostgreSQL
const userRouter = require('./routes/users')(pool);

// Routing
app.use('/users', userRouter);


app.listen(port, () => {
    console.log(`SERVER BERJALAN DI http://localhost:${port}`);
});