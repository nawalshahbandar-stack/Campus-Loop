const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test Database Connection
pool.connect()
    .then((client) => {
        console.log("✅ PostgreSQL Connected Successfully!");
        client.release();
    })
    .catch((err) => {
        console.log("❌ Database Connection Failed!");
        console.log("Error:", err.message);
    });

module.exports = pool;
