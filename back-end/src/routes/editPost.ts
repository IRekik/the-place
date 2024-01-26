import express from 'express';
import pool from '../utils/db';

const router = express.Router();

// Edit API endpoint: update the database using a new title, text content of a given post id, while logging edit date
router.post('/:postId', async (req, res) => {
    const { title, text_content } = req.body;

    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const edit_date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

    try {
        const postId = req.params.postId;
        const result = await pool.query('UPDATE blogs_table SET title = $2, content = $3, edit_date = $4 WHERE blog_id = $1', [postId, title, text_content, edit_date]);

        console.log('Data edited in the database:', result.rows[0]);
        res.json({ message: 'Data received and inserted successfully' });
    } catch (error) {
        console.error('Error editing data in the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;