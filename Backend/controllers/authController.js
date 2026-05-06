const pool = require('../config/db');

exports.register = async (req, res) => {
    const { first_name, last_name, phone, email, password, city, neighborhood, street } = req.body;
    
    try {
        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'המייל הזה כבר קיים במערכת' });
        }

        const query = `
            INSERT INTO users (first_name, last_name, phone, email, password, city, neighborhood, street) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, email`;
        
        const values = [first_name, last_name, phone, email, password, city, neighborhood, street];
        const result = await pool.query(query, values);
        
        res.status(201).json({ message: "משתמש נרשם בהצלחה", user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: "שגיאה ברישום המשתמש: " + err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        
        if (result.rows.length > 0) {
            res.json({ message: "התחברת בהצלחה", user: result.rows[0] });
        } else {
            res.status(401).json({ error: "אימייל או סיסמה שגויים" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};