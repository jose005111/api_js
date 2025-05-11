const db = require('../database/connection');

// Listar todos os usuários
exports.index = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar usuários' });
    res.json(results);
  });
};

// Buscar usuário por ID
exports.show = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar usuário' });
    if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(results[0]);
  });
};

// Criar novo usuário
exports.create = (req, res) => {
  const { nome, email, password } = req.body;
  if (!nome || !email || !password) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  const sql = 'INSERT INTO users (nome, email, password) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao criar usuário' });

    const insertedId = result.insertId;
    db.query('SELECT * FROM users WHERE id = ?', [insertedId], (err2, results) => {
      if (err2) return res.status(500).json({ error: 'Erro ao buscar usuário criado' });
      res.status(201).json(results[0]);
    });
  });
};

// Atualizar usuário
exports.update = (req, res) => {
  const { id } = req.params;
  const {nome, email, password } = req.body;

  const fields = [];
  const values = [];

  if (nome) { fields.push('nome = ?'); values.push(nome); }
  if (email) { fields.push('email = ?'); values.push(email); }
  if (password) { fields.push('password = ?'); values.push(password); }

  if (fields.length === 0) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  values.push(id);
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao atualizar usuário' });

    db.query('SELECT * FROM users WHERE id = ?', [id], (err2, results) => {
      if (err2) return res.status(500).json({ error: 'Erro ao buscar usuário atualizado' });
      if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(results[0]);
    });
  });
};

// Excluir usuário
exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao excluir usuário' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ message: 'Usuário excluído' });
  });
};
