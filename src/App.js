import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Map from './components/Map';
import Schedule from './components/Schedule';
import AddBalance from './components/AddBalance';
import Registration from './components/Registration';
import Payment from './components/Payment';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Account from './components/Account';
import About from './components/About';
import Support from './components/Support';
import Home from './components/Home';
import BuyTicket from './components/BuyTicket';
import BusList from './components/BusList';
import QRCodePage from './components/QRCodePage';
import './App.css';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleUpdateBalance = (newBalance) => {
    setUser(prevUser => ({ ...prevUser, balance: newBalance }));
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/buy-ticket/:busNumber/:time" element={<BuyTicket user={user} onUpdateBalance={handleUpdateBalance} />} />
          <Route path="/bus-list" element={<BusList user={user} />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/add-balance" element={<AddBalance />} />
          <Route path="/registration" element={<Registration onRegister={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/payment" element={user ? <Payment user={user} onUpdateBalance={handleUpdateBalance} /> : <Navigate to="/login" />} />
          <Route path="/account" element={user ? <Account user={user} onUpdateUser={handleLogin} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
          <Route path="/qrcode" element={<QRCodePage />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
