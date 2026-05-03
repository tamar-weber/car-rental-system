const pool = require('../config/db');

exports.getAllCars = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCar = async (req, res) => {
    const { model, brand, price_per_day, year } = req.body;
    try {
        const query = 'INSERT INTO cars (model, brand, price_per_day, year) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await pool.query(query, [model, brand, price_per_day, year]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};