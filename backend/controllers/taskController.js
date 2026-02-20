const { pool } = require('../db');

const getTasks = async (req, res) => {
    try {
        const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
        res.json(tasks.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const newTask = await pool.query(
            'INSERT INTO tasks (user_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [req.user.id, title, description, status || 'todo']
        );
        res.status(201).json(newTask.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const updatedTask = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
            [title, description, status, id, req.user.id]
        );
        if (updatedTask.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.id]);
        if (deletedTask.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
