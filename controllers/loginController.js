const db = require('../database/connection');

// Login de usuário
exports.login = (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar usuário' });
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const user = results[0];
    
    // Comparação simples de senha (em produção, use bcrypt ou similar)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Remove a senha do objeto de resposta por segurança
    delete user.password;
    
    res.json({ 
      message: 'Login bem-sucedido',
      user
    });
  });
};