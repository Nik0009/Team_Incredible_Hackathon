import React from 'react';
import './Card.css';

const Card = ({ number, label }) => {
  return (
    <div className={`card ${number > 150 ? 'blinking' : ''}`}>
      <div className="card-label">{label}</div>
      <div className="card-number">{number !== null ? number : 'N/A'}</div>
    </div>
  );
};

export default Card;