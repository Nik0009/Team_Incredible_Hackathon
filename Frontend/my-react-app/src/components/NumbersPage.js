
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NumbersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { numbers } = location.state || { numbers: [] };

  const handleNavigate = () => {
    navigate('/welcome');
  };

  return (
    <div className="numbers-page">
      <h1>Generated Numbers</h1>
      <p>{numbers.join(', ')}</p>
      <button onClick={handleNavigate}>Go to Welcome Page</button>
    </div>
  );
};

export default NumbersPage;