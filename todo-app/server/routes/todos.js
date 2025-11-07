const express = require('express');
const router = express.Router();
const db = require('../db');

// ===== GET all todos for current user =====
router.get('/', (req, res) => {
  const userId = req.user.id;

  db.all('SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const todos = rows.map(r => ({
      ...r,
      completed: !!r.completed
    }));

    res.json(todos);
  });
});

// ===== POST new todo =====
router.post('/', (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;

  if (!title) return res.status(400).json({ error: 'Title is required' });

  const sql = 'INSERT INTO todos (user_id, title) VALUES (?, ?)';
  db.run(sql, [userId, title], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    db.get('SELECT * FROM todos WHERE id = ?', [this.lastID], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ ...row, completed: !!row.completed });
    });
  });
});

// ===== PUT update todo (mark complete/incomplete) =====
router.put('/:id', (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { completed } = req.body;

  const sql = `
    UPDATE todos 
    SET completed = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ? AND user_id = ?
  `;
  db.run(sql, [completed ? 1 : 0, id, userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Todo not found or not yours' });
    }

    res.json({ id: Number(id), completed: !!completed });
  });
});

// ===== DELETE todo =====
router.delete('/:id', (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const sql = 'DELETE FROM todos WHERE id = ? AND user_id = ?';
  db.run(sql, [id, userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Todo not found or not yours' });
    }

    res.json({ deleted: true, id: Number(id) });
  });
});

module.exports = router;

