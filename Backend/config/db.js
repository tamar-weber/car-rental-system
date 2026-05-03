const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // נחוץ לחיבור מאובטח ל-Supabase
  }
});

module.exports = pool;
