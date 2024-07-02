import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header className="header">
      <button className="menu-button" onClick={toggleMenu}>☰</button>
      {menuVisible && (
        <div className="menu">
          <Link to="/" onClick={toggleMenu} className="nav-link">Home</Link>
          <Link to="/map" onClick={toggleMenu} className="nav-link">Mapa</Link>
          <Link to="/payment" onClick={toggleMenu} className="nav-link">Adicionar Saldo</Link>
          <Link to="/account" onClick={toggleMenu} className="nav-link">Minha Conta</Link>
        </div>
      )}
      <div className="header-center">
        <img src="logo.png" alt="Fast Buss" className="header-logo" />
      </div>
      <nav>
        {user ? (
          <div className="user-info-container">
            <div className="user-info">
              <span>Olá, {user.name}</span>
              <span>Saldo: R${typeof user.balance === 'number' ? user.balance.toFixed(2) : "0.00"}</span>
            </div>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/registration" className="nav-link">Cadastrar</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
