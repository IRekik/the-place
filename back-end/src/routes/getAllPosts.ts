import express from 'express';
import pool from '../utils/db';
import authenticateToken from '../utils/authMiddleware';

const router = express.Router();

// Get API endpoint: fetches all blog posts from the database, including all fields
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blogs_table ORDER BY creation_date DESC');
        const data = result.rows;

        console.log('All blogs retrieved from the database:', data);
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;