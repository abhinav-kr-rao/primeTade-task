const { pool } = require('../db');

const searchItems = async (req, res) => {
    const { q } = req.query;
    const userId = req.user.id;

    if (!q) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        // Search in Tasks
        const tasks = await pool.query(
            "SELECT 'task' as type, id, title as display_text, description, status, created_at FROM tasks WHERE user_id = $1 AND (title ILIKE $2 OR description ILIKE $2)",
            [userId, `%${q}%`]
        );

        // Search in Posts
        const posts = await pool.query(
            "SELECT 'post' as type, id, content as display_text, NULL as description, NULL as status, created_at FROM posts WHERE user_id = $1 AND content ILIKE $2",
            [userId, `%${q}%`]
        );

        const combinedResults = [...tasks.rows, ...posts.rows].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        res.json(combinedResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { searchItems };
