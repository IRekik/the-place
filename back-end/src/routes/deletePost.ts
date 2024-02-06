import express from 'express';
import pool from '../utils/db';
import authenticateToken from '../utils/authMiddleware';

const router = express.Router();

// Delete API endpoint: deletes element from the database using provided ID
router.delete('/:postId', authenticateToken, async (req, res) => {
    try {
        if (req.params.postId) {
            const postId = req.params.postId;
            const result = await pool.query('DELETE FROM blogs_table WHERE blog_id = $1', [postId]);

            if (result.rowCount === 1) {
                res.status(204).json(result.rows[0]);
                console.log('Post deleted from the database:', postId);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } else {
            console.log('Error deleting post from the database, one or multiple fields are missing')
            res.status(404).json({ error: 'The request does not include a post ID' });
        }
    } catch (error) {
        console.error('Error deleting post from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;