// src/components/QRCodePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const QRCodePage = () => {
  const location = useLocation();
  const { message, qrCode } = location.state || {};

  return (
    <div className="qrcode-page">
      <h2>{message}</h2>
      <p>Seu QR Code:</p>
      <div className="qrcode">
        {qrCode ? <img src={qrCode} alt="QR Code" /> : 'QR Code não disponível'}
      </div>
    </div>
  );
};

export default QRCodePage;
