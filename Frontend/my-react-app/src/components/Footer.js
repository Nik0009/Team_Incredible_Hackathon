import React from 'react';
import './Footer.css';

const Footer = ({ onClick }) => {
  return (
    <footer className="footer">
      <button onClick={onClick}>Show Change in Speed</button>
    </footer>
  );
};

export default Footer;