
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ onGenerate }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const numbers = await onGenerate();
    navigate('/numbers', { state: { numbers } });
  };

  return (
    <div className="home">
      <h1>Home Page</h1>
      <button onClick={handleClick}>Generate Numbers and Open Page</button>
    </div>
  );
};

export default Home;