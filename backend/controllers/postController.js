const { pool } = require('../db');

const getPosts = async (req, res) => {
    try {
        const posts = await pool.query('SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
        res.json(posts.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const createPost = async (req, res) => {
    const { content } = req.body;
    try {
        const newPost = await pool.query(
            'INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *',
            [req.user.id, content]
        );
        res.status(201).json(newPost.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const updatedPost = await pool.query(
            'UPDATE posts SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
            [content, id, req.user.id]
        );
        if (updatedPost.rows.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await pool.query('DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.id]);
        if (deletedPost.rows.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getPosts, createPost, updatePost, deletePost };
