
// src/components/Card.js
import React from 'react';
import './Card.css'; // Make sure to create this CSS file

const Card = ({ number }) => {
  const isBlinking = number > 150;

  return (
    <div className={`card ${isBlinking ? 'blinking' : ''}`}>
      {number !== null ? number : 'N/A'}
    </div>
  );
};

export default Card;