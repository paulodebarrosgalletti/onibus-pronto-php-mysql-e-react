import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register.php', {
        name,
        email,
        password
      });
      if (response.data.id) {
        setMessage('Usuário registrado com sucesso!');
      } else {
        setMessage(response.data.error || 'Erro ao registrar usuário.');
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setMessage('Erro ao registrar usuário. Tente novamente.');
    }
  };

  return (
    <div className="registration">
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn-register">Registrar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Registration;
