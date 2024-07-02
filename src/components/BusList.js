// src/components/BusList.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BusList.css';

const BusList = ({ user }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedLocation = searchParams.get('location');

  const busesData = {
    first: [
      { number: '004', times: ['08:00', '12:00', '16:00'] },
      { number: '004-1', times: ['08:00', '12:00', '16:00'] },
      { number: '012', times: ['08:00', '12:00', '16:00'] },
      { number: '030', times: ['08:00', '12:00', '16:00'] },
      { number: '033', times: ['08:00', '12:00', '16:00'] },
      { number: '032', times: ['08:00', '12:00', '16:00'] },
      { number: '037', times: ['08:00', '12:00', '16:00'] },
      { number: '579', times: ['08:00', '12:00', '16:00'] },
    ],
    second: [
      { number: '005', times: ['08:00', '12:00', '16:00'] },
      { number: '033', times: ['08:00', '12:00', '16:00'] },
    ]
  };

  const buses = busesData[selectedLocation] || [];

  const sortedBuses = buses.flatMap(bus =>
    bus.times.map(time => ({
      number: bus.number,
      time,
    }))
  ).sort((a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    return timeA[0] - timeB[0] || timeA[1] - timeB[1];
  });

  return (
    <div className="bus-list">
      <h2>Ônibus</h2>
      <h2>Horário</h2>
      <h2>Comprar</h2>
      <div className="bus-table">
        
        {sortedBuses.map(bus => (
          <div key={`${bus.number}-${bus.time}`} className="bus-row">
            <div className="bus-cell">{bus.number}</div>
            <div className="bus-cell">{bus.time}</div>
            <div className="bus-cell">
              <Link
                to={`/buy-ticket/${bus.number}/${bus.time}`}
                className="buy-button"
              >
                Comprar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;
