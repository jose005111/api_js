const db = require('../database/connection');

// Listar todos os delegados
exports.index = (req, res) => {
  db.query('SELECT * FROM delegados', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar delegados' });
    res.json(results);
  });
};

// Buscar um delegado pelo ID
exports.show = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM delegados WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar delegado' });
    if (results.length === 0) return res.status(404).json({ error: 'Delegado não encontrado' });
    res.json(results[0]);
  });
};

// Criar novo delegado
exports.create = (req, res) => {
  const { nome, orgao, atributo, observacao } = req.body;
  if (!nome || !orgao || !atributo) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  const sql = 'INSERT INTO delegados (nome, orgao, atributo, observacao) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, orgao, atributo, observacao], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao inserir delegado' });

    const insertedId = result.insertId;
    db.query('SELECT * FROM delegados WHERE id = ?', [insertedId], (err2, results) => {
      if (err2) return res.status(500).json({ error: 'Erro ao buscar delegado criado' });
      res.status(201).json(results[0]);
    });
  });
};

// Atualizar delegado
exports.update = (req, res) => {
  const { id } = req.params;
  const { nome, orgao, atributo, observacao } = req.body;

  const fields = [];
  const values = [];

  if (nome) { fields.push('nome = ?'); values.push(nome); }
  if (orgao) { fields.push('orgao = ?'); values.push(orgao); }
  if (atributo) { fields.push('atributo = ?'); values.push(atributo); }
  if (observacao) { fields.push('observacao = ?'); values.push(observacao); }

  if (fields.length === 0) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  values.push(id);
  const sql = `UPDATE delegados SET ${fields.join(', ')} WHERE id = ?`;

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao atualizar delegado' });

    db.query('SELECT * FROM delegados WHERE id = ?', [id], (err2, results) => {
      if (err2) return res.status(500).json({ error: 'Erro ao buscar delegado atualizado' });
      if (results.length === 0) return res.status(404).json({ error: 'Delegado não encontrado' });
      res.json(results[0]);
    });
  });
};

// Excluir delegado
exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM delegados WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao excluir delegado' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Delegado não encontrado' });
    res.json({ message: 'Delegado excluído' });
  });
};
