import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode';
import './BuyTicket.css';

const BuyTicket = ({ user, onUpdateBalance }) => {
  const { busNumber, time } = useParams();
  const [qrcodeUrl, setQrcodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isGenerating) {
      handleGenerateQrcode();
    }
  }, [isGenerating]);

  const handleGenerateQrcode = async () => {
    try {
      const qrCodeValue = `ticket:bus=${busNumber}&time=${time}`;
      const url = await QRCode.toDataURL(qrCodeValue);
      setQrcodeUrl(url);
      setIsGenerating(false);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      setIsGenerating(false);
    }
  };

  const handleConfirmPurchase = async () => {
    if (!user || user.balance < 5) {
      alert('Saldo insuficiente.');
      return;
    }
    try {
      const newBalance = user.balance - 5;
      const response = await axios.patch('/api/buy_ticket.php', { id: user.id, new_balance: newBalance });
      if (response.data.message) {
        onUpdateBalance(newBalance);
        setMessage(response.data.message);
        navigate('/qrcode', { state: { message: 'Compra realizada com sucesso. Boa viagem!', qrCode: qrcodeUrl } });
      } else {
        setMessage(response.data.error || 'Erro ao processar compra.');
      }
    } catch (error) {
      console.error('Erro ao processar compra:', error);
      setMessage('Erro ao processar compra.');
    }
  };

  return (
    <div className="buy-ticket">
      <h2>Comprar Passagem</h2>
      <p>Ônibus: {busNumber}</p>
      <p>Horário: {time}</p>
      <p>Valor: R$5,00</p>
      {user && (
        <div className="current-balance">
          Saldo Atual:
          <div className="balance-amount">R${user.balance.toFixed(2)}</div>
        </div>
      )}
      <button onClick={() => setIsGenerating(true)} className="btn-confirm">Gerar QR Code</button>
      {qrcodeUrl && (
        <>
          <img src={qrcodeUrl} alt="QR Code" />
          <button onClick={handleConfirmPurchase} className="btn-confirm">Confirmar Compra</button>
        </>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default BuyTicket;
