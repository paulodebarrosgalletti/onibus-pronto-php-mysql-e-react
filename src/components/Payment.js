import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';
import './Payment.css';

const Payment = ({ user, onUpdateBalance }) => {
  const [showMethods, setShowMethods] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState(0);
  const [qrcodeUrl, setQrcodeUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleAddBalance = (method) => {
    setSelectedMethod(method);
    setShowMethods(false);
  };

  const handleGenerateQrcode = async () => {
    try {
      const url = await QRCode.toDataURL(`pix:payment?amount=${amount}`);
      setQrcodeUrl(url);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      const newBalance = parseFloat(user.balance) + parseFloat(amount);
      const response = await axios.patch('/api/update_balance.php', { id: user.id, balance: newBalance });
      if (response.data.message) {
        onUpdateBalance(newBalance);
        setMessage(response.data.message);
        setAmount(0);
        setSelectedMethod(null);
        setQrcodeUrl('');
      } else {
        setMessage(response.data.error || 'Erro ao atualizar saldo.');
      }
    } catch (error) {
      console.error('Erro ao atualizar saldo:', error);
      setMessage('Erro ao atualizar saldo.');
    }
  };

  return (
    <div className="payment">
      <h2>Pagamento</h2>
      <div className="current-balance">
        Saldo Atual:
        <div className="balance-amount">R${typeof user.balance === 'number' ? user.balance.toFixed(2) : '0.00'}</div>
      </div>
      {!showMethods && (
        <button className="btn-add-credit" onClick={() => setShowMethods(true)}>Adicionar Saldo</button>
      )}
      {showMethods && (
        <div className="payment-methods">
          <button className="btn-method" onClick={() => handleAddBalance('Débito')}>Débito</button>
          <button className="btn-method" onClick={() => handleAddBalance('PIX')}>PIX</button>
          <button className="btn-method" onClick={() => handleAddBalance('Crédito')}>Crédito</button>
        </div>
      )}
      {selectedMethod && (
        <div className="payment-details">
          <h3>Adicionar Saldo via {selectedMethod}</h3>
          <div className="suggested-amounts">
            <button onClick={() => setAmount(10)}>R$10</button>
            <button onClick={() => setAmount(20)}>R$20</button>
            <button onClick={() => setAmount(50)}>R$50</button>
            <button onClick={() => setAmount(100)}>R$100</button>
          </div>
          <input
            type="number"
            placeholder="Outro valor"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
          />
          {selectedMethod === 'PIX' && (
            <div className="pix-code">
              <button onClick={handleGenerateQrcode} className="btn-confirm">Gerar QR Code</button>
              {qrcodeUrl && (
                <>
                  <img src={qrcodeUrl} alt="QR Code" />
                  <button onClick={handleConfirmPayment} className="btn-confirm">Confirmar Pagamento</button>
                </>
              )}
            </div>
          )}
          {(selectedMethod === 'Débito' || selectedMethod === 'Crédito') && (
            <div className="card-details">
              <input type="text" placeholder="Número do cartão" className="input" />
              <input type="text" placeholder="Nome no cartão" className="input" />
              <input type="text" placeholder="Validade" className="input" />
              <input type="text" placeholder="CVV" className="input" />
              <button onClick={handleConfirmPayment} className="btn-confirm">Confirmar Pagamento</button>
            </div>
          )}
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Payment;
