const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then((client) => {
    console.log("✅ Connected to PostgreSQL database successfully");
    client.release(); // release the client back to the pool
  })
  .catch((err) => {
    console.error("❌ Failed to connect to PostgreSQL database:", err);
  });

module.exports = pool;
