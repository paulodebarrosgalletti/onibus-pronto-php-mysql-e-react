import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Account.css';

const Account = ({ user, onUpdateUser, onLogout }) => {
  const [name, setName] = useState(user.name);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const response = await axios.patch('/api/update_user.php', { id: user.id, name, balance: user.balance });
      if (response.data.message) {
        onUpdateUser({ ...user, name });
        setMessage(response.data.message);
      } else {
        setMessage(response.data.error || 'Erro ao atualizar o nome.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o nome:', error);
      setMessage('Erro ao atualizar o nome.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('/api/delete_user.php', { data: { id: user.id } });
      if (response.data.message) {
        onLogout();
        navigate('/'); // Redireciona para a tela inicial
      } else {
        setMessage(response.data.error || 'Erro ao excluir a conta.');
      }
    } catch (error) {
      console.error('Erro ao excluir a conta:', error);
      setMessage('Erro ao excluir a conta.');
    }
  };

  return (
    <div className="minha-conta">
      <h2>Minha Conta</h2>
      <div className="current-balance">
        Saldo Atual:
        <div className="balance-amount">R${typeof user.balance === 'number' ? user.balance.toFixed(2) : '0.00'}</div>
      </div>
      <input
        type="text"
        value={user.email}
        readOnly
        className="input readonly-input"
      />
      <input
        type="text"
        placeholder="Digite seu novo nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <button onClick={handleUpdate} className="btn-update">Atualizar Nome</button>
      <button onClick={handleDelete} className="btn-delete">Excluir Conta</button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Account;
