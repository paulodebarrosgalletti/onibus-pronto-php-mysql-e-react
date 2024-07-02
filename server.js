const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'u271476192_123',
  password: 'Onibus8@',
  database: 'u271476192_my_bus_db'
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Custom registration route
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email, password, balance) VALUES (?, ?, ?, 0)';
  
  connection.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('Erro ao registrar usuário:', err);
      res.status(500).json({ error: 'Erro ao registrar usuário.' });
      return;
    }
    res.status(201).json({ id: results.insertId, name, email, balance: 0 });
  });
});

// Custom login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      res.status(500).json({ error: 'Erro ao fazer login.' });
      return;
    }
    if (results.length > 0) {
      const user = results[0];
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Credenciais inválidas.' });
    }
  });
});

// Custom update user route
app.patch('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, balance } = req.body;
  const query = 'UPDATE users SET name = ?, balance = ? WHERE id = ?';
  
  connection.query(query, [name, balance, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).json({ error: 'Erro ao atualizar usuário.' });
      return;
    }
    res.status(200).json({ message: 'Usuário atualizado com sucesso.', balance });
  });
});

// Custom delete user route
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir usuário:', err);
      res.status(500).json({ error: 'Erro ao excluir usuário.' });
      return;
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  });
});

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
